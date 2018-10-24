var router = require('express').Router();
var identityClient = require('../../lib/identity_client')(process.env.IDENTITY_ENDPOINT)
var createError = require('http-errors');

const isAllowed = (token) =>
  (token.roles || []).findIndex((r) => r.name=='admin')>0 &&
  (token.project && token.project.name == process.env.AUTH_SCOPE_PROJECT) &&
  (token.project && token.project.domain && token.project.domain.name==process.env.AUTH_SCOPE_DOMAIN)
;

// hook executed before every api request
router.use((req, res, next) => {
  // for all api requests except root, login and logout
  if(['/','/auth/login','/auth/logout'].indexOf(req.path)>=0) return next()
  let authToken = req.cookies.auth_token
  // raise 401 error unless token exists
  if(!authToken) return next(createError(401))

  // validate token
  identityClient.validateAuthToken(req.cookies.auth_token)
    .then( response => {
      var tokenData = response.data.token
      // raise 403 error if user has no permissions
      if(!isAllowed(tokenData)) return next(createError(403))
      req.tokenData = tokenData
      req.authToken = authToken
      next()
    })
    .catch(error => next(error))
})

router.get("/", (req, res) => res.sendStatus(200) );

// split up route handling
router.use('/auth', require('./auth'));
router.use('/lookup', require('./lookup'));

// etc.

module.exports = router;
