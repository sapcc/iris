var router = require('express').Router();
var identityClient = require('../../lib/identity_client')(process.env.IDENTITY_ENDPOINT)
var createError = require('http-errors');

const isAllowed = (token) =>
  (token.roles || []).findIndex((r) => r.name=='admin')>0 &&
  (token.project && token.project.name == process.env.AUTH_SCOPE_PROJECT) &&
  (token.project && token.project.domain && token.project.domain.name==process.env.AUTH_SCOPE_DOMAIN)
;

const mergeUserAndToken = (user,token) => {
  for(let key of ['expires_at', 'roles']) user[key] = token[key]
  return user
}

const errorInfo = (error) => {
  let status = error.response ? error.response.status : error.status || 500
  let message = (error.response && error.response.data && error.response.data.error && error.response.data.error.message) || error.message
  return {status,message}
}

router.post("/login", (req, res) => {
  console.log('::::::::::::::::LOGIN::::::::::::::::')
  identityClient.createTokenByPassword({
    domain: process.env.AUTH_SCOPE_DOMAIN,
    scopeDomainName: process.env.AUTH_SCOPE_DOMAIN,
    scopeProjectName: process.env.AUTH_SCOPE_PROJECT,
    user: req.body.user,
    password: req.body.password
  }).then(response => {
    req.token = response.data.token
    req.authToken = response.headers['x-subject-token']

    // check permissions
    if(!isAllowed(req.token)) throw createError(403)
    return identityClient.user(req.authToken, req.token.user.id)

  }).then(response => {
    res.cookie('auth_token', req.authToken, {
      expires: new Date(req.token.expires_at), secure: req.app.get('env')=='production', httpOnly: true
    }).status(200).json(mergeUserAndToken(response.data.user,req.token))
  }).catch(error => {
    let info = errorInfo(error)
    res.status(info.status).send(info.message)
  })
});

router.post("/logout", (req, res) => {
  return res.clearCookie('auth_token').sendStatus(200)
})

router.get('/profile', (req, res) => {
  identityClient.user(req.authToken, req.tokenData.user.id).then(response => {
    res.json(mergeUserAndToken(response.data.user,req.tokenData))
  }).catch(error => {
    let info = errorInfo(error)
    res.status(info.status).send(info.message)
  })
})

//
// // api/products/:id
// router.get('/:id', function(req, res) {
//   res.json({ id: req.params.id });
// });

module.exports = router;
