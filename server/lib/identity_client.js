const axios = require('axios');
var {apiRequest} = require('./api_helpers');
var {Token} = require('./token')
var createError = require('http-errors');

module.exports = (endpoint) => {
  if(endpoint.endsWith('/')) endpoint = endpoint.substring(0,endpoint.length-1)
  if(endpoint.endsWith('/v3')) endpoint = endpoint.substring(0,endpoint.length-3)

  const buildScopeParams = (scopeOptions = {}) => {
    let scope = {}
    if (scopeOptions.scopeProjectId)
      scope["project"] = {
        "id": scopeOptions.scopeProjectId
      }
    else if (scopeOptions.scopeProjectName) {
      scope["project"] = {
        "name": scopeOptions.scopeProjectName
      }
      if (scopeOptions.scopeDomainId) {
        scope["project"]["domain"] = {
          "id": scopeOptions.scopeDomainId
        }
      } else {
        scope["project"]["domain"] = {
          "name": scopeOptions.scopeDomainName
        }
      }
    } else if (scopeOptions.scopeDomainId) {
      scope["domain"] = {
        "id": scopeOptions.scopeDomainId
      }
    } else if (scopeOptions.scopeDomainName) {
      scope["domain"] = {
        "name": scopeOptions.scopeDomainName
      }
    }
    if (Object.keys(scope).length > 0)
      return scope
    return null
  }

  const validateSsoCertificate = (verify,cert) => {
    // return false unless succes or no x509 certificate given
    if(verify != 'SUCCESS' || !cert || cert.trim().length == 0) {
      return Promise.reject(createError(401))
    }

    // set headers for authentication call
    headers = {
      'SSL-Client-Verify': verify,
      'SSL-Client-Cert': cert,
      'X-User-Domain-Name': process.env.AUTH_SCOPE_DOMAIN
    }
    // set scope infos
    scope = {
      scopeDomainName: process.env.AUTH_SCOPE_DOMAIN,
      scopeProjectName: process.env.AUTH_SCOPE_PROJECT
    }

    return createTokenByExternal(headers, scope)
  }

  const validateCookieToken = (authToken) => {
    if(!authToken) return Promise.reject(createError(401))
    return validateAuthToken(authToken)
  }

  const validateAuthToken = (authToken) =>
    apiRequest(
      axios.get(`${endpoint}/v3/auth/tokens`, {
        headers: {'X-Subject-Token': authToken, 'X-Auth-Token': authToken}
      }).then(response =>
        new Token(response.data.token, response.headers['x-subject-token'])
      )
    )
  ;

  const user = (authToken,id) =>
    apiRequest(
      axios.get(`${endpoint}/v3/users/${id}`, {
        headers: {'X-Auth-Token': authToken}
      }).then(response => response.data.user)
    )
  ;

  const createTokenByPassword = (options = {}) => {
    let auth = {
      "identity": {
        "methods": ["password"],
        "password": {
          "user": {
            "name": options.user,
            "domain": {
              "name": options.domain
            },
            "password": options.password
          }
        }
      }
    }

    let scope = buildScopeParams(options)
    if (scope) auth["scope"] = scope

    return apiRequest(
      axios.post(`${endpoint}/v3/auth/tokens?nocatalog`, {auth})
        .then(response =>
          new Token(response.data.token, response.headers['x-subject-token'])
        ).catch(e => console.log(e))
    )
  }

  const createTokenByExternal = (headers = {}, scope=nil) => {
    let auth = {
      "identity": {
        "methods": ["external"],
        "external": {}
      },
      'scope': scope ? buildScopeParams(scope) : 'unscoped'
    }

    headers['Content-Type'] = headers['Content-Type'] || 'application/json'

    return apiRequest(
      axios.post(`${endpoint}/v3/auth/tokens?nocatalog`, {auth}, {headers})
        .then(response =>
          new Token(response.data.token, response.headers['x-subject-token'])
        )
    )
  }

  return {
    validateSsoCertificate,
    validateCookieToken,
    createTokenByPassword,
    validateAuthToken,
    createTokenByExternal,
    user
  }
}
