var router = require('express').Router();
var identityClient = require('../../lib/identity_client')(process.env.IDENTITY_ENDPOINT)
var createError = require('http-errors');
var {isAllowed} = require('../../lib/policy');

const validateAuthentication = (req) =>
  new Promise((resolve, reject) => {
    identityClient.validateCookieToken(req.cookies.auth_token)
      .then(token => resolve(token))
      .catch(error =>
        identityClient.validateSsoCertificate(process.env)
          .then(token => resolve(token))
          .catch(e => reject(e))
      )
  })
;

// hook executed before every api request
router.use((req, res, next) => {
  // for all api requests except root, login and logout
  if(['/','/auth/login','/auth/logout'].indexOf(req.path)>=0) return next()

  console.log(':::::::::::::::::::::validateAuthtentication', 'req.get("HTTP_SSL_CLIENT_VERIFY")', req.get("HTTP_SSL_CLIENT_VERIFY"))
  console.log(':::::::::::::::::::::validateAuthtentication', 'req.get("http_ssl_client_verify")', req.get("http_ssl_client_verify"))
  console.log(':::::::::::::::::::::validateAuthtentication', 'req.header("HTTP_SSL_CLIENT_VERIFY")', req.header("HTTP_SSL_CLIENT_VERIFY"))
  console.log(':::::::::::::::::::::validateAuthtentication', 'req.header("http_ssl_client_verify")', req.header("http_ssl_client_verify"))
  console.log(':::::::::::::::::::::validateAuthtentication', 'env["HTTP_SSL_CLIENT_VERIFY"]', process.env['HTTP_SSL_CLIENT_VERIFY'])
  console.log(':::::::::::::::::::::validateAuthtentication', 'env["HTTP_SSL_CLIENT_CERT"]', process.env['HTTP_SSL_CLIENT_CERT'])

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
