var router = require('express').Router();
var identityClient = require('../../lib/identity_client')(process.env.IDENTITY_ENDPOINT)
var createError = require('http-errors');
var {isAllowed} = require('../../lib/policy');

const validateSsoCertificate = (env) => {
  // return false unless succes or no x509 certificate given
  if(env['HTTP_SSL_CLIENT_VERIFY'] != 'SUCCESS' ||
     !env['HTTP_SSL_CLIENT_CERT'] ||
     env['HTTP_SSL_CLIENT_CERT'].trim().length == 0) {
    return Promise.reject(createError(401))
  }

  // set headers for authentication call
  headers = {
    'SSL-Client-Verify': env['HTTP_SSL_CLIENT_VERIFY'],
    'SSL-Client-Cert': env['HTTP_SSL_CLIENT_CERT'],
    'X-User-Domain-Name': process.env.AUTH_SCOPE_DOMAIN
  }
  // set scope infos
  scope = {
    scopeDomainName: process.env.AUTH_SCOPE_DOMAIN,
    scopeProjectName: process.env.AUTH_SCOPE_PROJECT
  }
  return identityClient.createTokenByExternal(headers, scope)
}

const validateCookieToken = (authToken) => {
  if(!authToken) return Promise.reject(createError(401))
  return identityClient.validateAuthToken(authToken)
}

const validateAuthentication = (req) =>
  new Promise((resolve, reject) => {
    validateCookieToken(req.cookies.auth_token)
      .then(token => resolve(token))
      .catch(error =>
        validateSsoCertificate(process.env)
          .then(token => resolve(token))
          .catch(e => reject(e))
      )
  })


// hook executed before every api request
router.use((req, res, next) => {
  // for all api requests except root, login and logout
  if(['/','/auth/login','/auth/logout'].indexOf(req.path)>=0) return next()

  validateAuthentication(req).then(token => {
    // raise 403 error if user has no permissions
    if(!isAllowed(token.data)) return next(createError(403))
    req.tokenData = token.data
    req.authToken = token.authToken
    next()
  }).catch(error => next(error))
})


router.get("/", (req, res) => res.sendStatus(200) );

// split up route handling
router.use('/auth', require('./auth'));
router.use('/lookup', require('./lookup'));

// etc.

module.exports = router;
