import axios from 'axios';
import {
  CLEAR_USER_PROFILE,
  REQUEST_LOG_ON,
  REQUEST_LOG_ON_FAILURE,
  REQUEST_USER_PROFILE,
  REQUEST_USER_PROFILE_FAILURE,
  RECEIVE_USER_PROFILE
} from '../constants'

const errorMessage = (error) =>
  error.response && error.response.data || error.message

//################ PROFILE #################
const clearUserProfile = () => (
  {
    type: CLEAR_USER_PROFILE,
    requestedAt: Date.now()
  }
)

const requestLogOn = () => (
  {
    type: REQUEST_LOG_ON
  }
)

const requestLogOnFailure = (error) => (
  {
    type: REQUEST_LOG_ON_FAILURE,
    error
  }
)

const requestUserProfile = () => (
  {
    type: REQUEST_USER_PROFILE,
    requestedAt: Date.now()
  }
)

const requestUserProfileFailure = (error) => (
  {
    type: REQUEST_USER_PROFILE_FAILURE,
    error
  }
)

const receiveUserProfile = (user) => (
  {
    type: RECEIVE_USER_PROFILE,
    receivedAt: Date.now(),
    user
  }
)

const loadUserProfile = () => (
  (dispatch) => {
    dispatch(requestUserProfile())
    axios.get('/api/auth/profile').then(response => {
      dispatch(receiveUserProfile(response.data))
    }).catch(error => {
      dispatch(requestUserProfileFailure(errorMessage(error)))
    })
  }
)

//################# AUTH ###################
const login = ({user,password}) =>
  (dispatch, getState) => {
    dispatch(requestLogOn())
    axios.post('/api/auth/login', {user, password}).then(response => {
      dispatch(receiveUserProfile(response.data))
    }).catch(error => {
      console.log(error.response)
      dispatch(requestLogOnFailure(errorMessage(error)))
    })
  }
;

const logout = () =>
  (dispatch) => {
    axios.post('/api/auth/logout').then(response => {
      dispatch(clearUserProfile())
    }).catch(error => {
      dispatch(requestLogOnFailure(errorMessage(error)))
    })
  }
;

export {
  login,
  logout,
  loadUserProfile
}
