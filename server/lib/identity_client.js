const axios = require('axios');
var {apiRequest} = require('./api_helpers');
var {Token} = require('./token')


module.exports = (endpoint) => {
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
        )
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
    createTokenByPassword,
    validateAuthToken,
    createTokenByExternal,
    user
  }
}
