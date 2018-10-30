import {
  REQUEST_DEPENDENCIES,
  REQUEST_DEPENDENCIES_FAILURE,
  RECEIVE_DEPENDENCIES
} from '../constants'

const initialState = {}

const initialDependencyState = {
  items: {},
  isFetching: false,
  error: null
}

const requestDependencies = (state,{id}) => {
  return {...state, [id]: {...initialDependencyState, isFetching: true}}
}

const requestDependenciesFailure = (state,{id,error}) => {
  return {...state, [id]: {...initialDependencyState, isFetching: false, error}}
}

const receiveDependencies = (state,{id,items}) => {
  return {...state, [id]: {...initialDependencyState, isFetching: false, items}}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_DEPENDENCIES: return requestDependencies(state,action)
    case REQUEST_DEPENDENCIES_FAILURE: return requestDependenciesFailure(state,action)
    case RECEIVE_DEPENDENCIES: return receiveDependencies(state,action)
    default: return state
  }
}
