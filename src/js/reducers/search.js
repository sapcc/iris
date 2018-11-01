import {
  REQUEST_SEARCH,
  REQUEST_SEARCH_FAILURE,
  RECEIVE_SEARCH_RESULTS,
  EXTEND_SEARCH_HISTORY,
  UPDATE_SEARCH_FILTER
} from '../constants'


const initialState = {
  items: [],
  isFetching: false,
  error: null,
  filter: {},
  requestedAt: null,
  receivedAt: null,
  history: []
}

const updateSearchFilter = (state,{filter}) => {
  let newState = {...state}
  newState.filter = {...filter}
  return newState
}

const requestSearch = (state,{requestedAt}) => {
  return {...state, isFetching: true, error: null, requestedAt, items: [], history: []}
}

const requestSearchFailure = (state,{error}) => {
  return {...state, isFetching: false, error}
}

const receiveSearchResults = (state,{receivedAt, items}) => {
  return {...state, isFetching: false, error: null, items, receivedAt}
}

const extendHistory = (state,{id}) => {
  let index = state.history.indexOf(id)
  console.log('extendHistory index',index)
  if(state.history.length>0 && index==state.history.length-1) return state
  if(index>=0) return {...state, history: state.history.slice(0,index+1)}

  let history = state.history.slice(0)
  history.push(id)
  return {...state, history}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SEARCH: return requestSearch(state,action)
    case REQUEST_SEARCH_FAILURE: return requestSearchFailure(state,action)
    case RECEIVE_SEARCH_RESULTS: return receiveSearchResults(state,action)
    case EXTEND_SEARCH_HISTORY: return extendHistory(state,action)
    case UPDATE_SEARCH_FILTER: return updateSearchFilter(state,action)
    default: return state
  }
}
