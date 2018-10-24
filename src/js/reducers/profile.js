import {
  CLEAR_USER_PROFILE,
  REQUEST_LOG_ON,
  REQUEST_LOG_ON_FAILURE,
  REQUEST_USER_PROFILE,
  REQUEST_USER_PROFILE_FAILURE,
  RECEIVE_USER_PROFILE
} from '../constants'

const initialState = {
  user: null,
  isFetching: false,
  isBeingLoggedOn: false,
  loginError: null,
  profileError: null,
  requestedAt: null,
  receivedAt: null,
}

const clearUserProfile = (state) => {
  return {...initialState}
}

const requestLogOn = (state) => {
  return {...state, isBeingLoggedOn: true, loginError: null}
}

const requestLogOnFailure = (state,{error}) => {
  return {...state, isBeingLoggedOn: false, loginError: error}
}

const requestUserProfile = (state,{requestedAt}) => {
  return {...state, requestedAt, isFetching: true, profileError: null}
}

const requestUserProfileFailure = (state,{error}) => {
  return {...state, isFetching: false, profileError: error}
}

const receiveUserProfile = (state,{receivedAt, user}) => {
  return {...state, isFetching: false, isBeingLoggedOn: false, user, loginError: null, profileError: null}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_USER_PROFILE: return clearUserProfile(state,action)
    case REQUEST_LOG_ON: return requestLogOn(state,action)
    case REQUEST_LOG_ON_FAILURE: return requestLogOnFailure(state,action)
    case REQUEST_USER_PROFILE: return requestUserProfile(state,action)
    case REQUEST_USER_PROFILE_FAILURE: return requestUserProfileFailure(state,action)
    case RECEIVE_USER_PROFILE: return receiveUserProfile(state,action)
    default: return state
  }
}
