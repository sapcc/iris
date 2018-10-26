var {ApiError} = require('./api_error')

// wrap api request in a promisse
const apiRequest = (promise) => {
  return new Promise((resolve,reject) => {
    promise
      .then(response => resolve(response))
      .catch(error => reject(new ApiError(error))) // wrap error
  })
}

// merge user and token values
const mergeUserAndToken = (user,token) => {
  for(let key of ['expires_at', 'roles']) user[key] = token[key]
  return user
}

module.exports = {
  apiRequest, mergeUserAndToken
}
