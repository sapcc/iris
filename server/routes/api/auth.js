var router = require('express').Router();
var identityClient = require('../../lib/identity_client')(process.env.IDENTITY_ENDPOINT)
var createError = require('http-errors');
var {isAllowed} = require('../../lib/policy');
var {mergeUserAndToken} = require('../../lib/api_helpers');

router.post("/login", (req, res) => {
  console.log('::::::::::::::::LOGIN::::::::::::::::')
  identityClient.createTokenByPassword({
    domain: process.env.AUTH_SCOPE_DOMAIN,
    scopeDomainName: process.env.AUTH_SCOPE_DOMAIN,
    scopeProjectName: process.env.AUTH_SCOPE_PROJECT,
    user: req.body.user,
    password: req.body.password
  }).then(token => {
    req.token = token.data
    req.authToken = token.authToken

    // check permissions
    if(!isAllowed(req.token)) throw createError(403)
    return identityClient.user(req.authToken, req.token.user.id)
  }).then(user => {
    res.cookie('auth_token', req.authToken, {
      expires: new Date(req.token.expires_at),
      secure: req.app.get('env')=='production',
      httpOnly: true
    }).status(200).json(mergeUserAndToken(user,req.token))
  }).catch(error => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',error.message)
    res.status(error.status).send(error.message)
  })
});

router.post("/logout", (req, res) => {
  return res.clearCookie('auth_token').sendStatus(200)
})

router.get('/profile', (req, res) => {
  identityClient.user(req.authToken, req.tokenData.user.id).then(user => {
    res.json(mergeUserAndToken(user,req.tokenData))
  }).catch(error => res.status(error.status).send(error.message))
})


module.exports = router;
