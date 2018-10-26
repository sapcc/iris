class ApiError {
  constructor(error){
    this.status = error.response ? error.response.status : error.status || 500
    this.message = (error.response && error.response.data &&
                    error.response.data.error &&
                    error.response.data.error.message) || error.message
  }
}

module.exports = {ApiError}
