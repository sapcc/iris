import axios from 'axios';

export default(endpoint) => {
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

    return axios.post(`${endpoint}/v3/auth/tokens`, {auth})
  }

  return {createTokenByPassword}
}
