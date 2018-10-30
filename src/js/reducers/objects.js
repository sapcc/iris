import {
  REQUEST_OBJECT,
  REQUEST_OBJECT_FAILURE,
  RECEIVE_OBJECT
} from '../constants'

const initialState = []

const initialObjectState = {
  isFetching: false,
  loadError: null,
  requestedAt: null,
  receivedAt: null
}

const requestObject = (state,{requestedAt,id}) => {
  let newState = state.slice()
  let itemIndex = newState.findIndex(i => i.id == id)

  if(itemIndex>=0) {
    newState[itemIndex] = {...newState[itemIndex], isFetching: true, requestedAt, loadError: null}
  } else {
    newState.push({...initialObjectState, id, isFetching: true, requestedAt, loadError: null})
  }
  return newState
}

const requestObjectFailure = (state,{id,error}) => {
  let newState = state.slice()
  let itemIndex = newState.findIndex(i => i.id == id)

  if(itemIndex>=0) {
    newState[itemIndex] = {...newState[itemIndex], isFetching: false, loadError: error}
  } else {
    newState.push({...initialObjectState, id, isFetching: false, loadError: error})
  }
  return newState
}

const receiveObject = (state,{receivedAt, item}) => {
  let newState = state.slice(0)
  let itemIndex = newState.findIndex(i => i.id == item.id)

  if(itemIndex>=0) {
    newState[itemIndex] = {...item, isFetching: false, receivedAt, loadError: null}
  } else {
    newState.push({...item, isFetching: false, receivedAt, loadError: null})
  }
  return newState
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_OBJECT: return requestObject(state,action)
    case REQUEST_OBJECT_FAILURE: return requestObjectFailure(state,action)
    case RECEIVE_OBJECT: return receiveObject(state,action)
    default: return state
  }
}
