const axios = require('axios');

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

  const validateAuthToken = (authToken) => {
    return axios.get(`${endpoint}/v3/auth/tokens`, {
      headers: {'X-Subject-Token': authToken, 'X-Auth-Token': authToken}
    })
  }

  const user = (authToken,id) => {
    console.log('id',id)
    return axios.get(`${endpoint}/v3/users/${id}`, {
      headers: {'X-Auth-Token': authToken}
    })
  }

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

    return axios.post(`${endpoint}/v3/auth/tokens?nocatalog`, {auth})
  }

  return {
    createTokenByPassword,
    validateAuthToken,
    user
  }
}
