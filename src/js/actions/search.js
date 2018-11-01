import axios from 'axios';
import {
  REQUEST_SEARCH,
  REQUEST_SEARCH_FAILURE,
  RECEIVE_SEARCH_RESULTS,
  EXTEND_SEARCH_HISTORY,
  UPDATE_SEARCH_FILTER
} from '../constants'

const errorMessage = (error) =>
  error.response && error.response.data || error.message

//################ Search #################
const requestSearch = () => (
  {
    type: REQUEST_SEARCH,
    requestedAt: Date.now()
  }
)

const requestSearchFailure = (error) => (
  {
    type: REQUEST_SEARCH_FAILURE,
    error
  }
)

const receiveSearchResults = (items) => (
  {
    type: RECEIVE_SEARCH_RESULTS,
    receivedAt: Date.now(),
    items
  }
)

const extendHistory = (id) => (
  {
    type: EXTEND_SEARCH_HISTORY,
    id
  }
)

const updateSearchFilter = (filter) => (
  {
    type: UPDATE_SEARCH_FILTER,
    filter
  }
)

const findObjects = () =>
  (dispatch,getState) => {
    dispatch(requestSearch())
    let filter = getState()['search']['filter']

    axios.get(`/api/lookup/search`, {params: filter})
      .then(response => dispatch(receiveSearchResults(response.data)))
      .catch(error => dispatch(requestSearchFailure(errorMessage(error))))
  }
;

export {
  findObjects,
  updateSearchFilter,
  extendHistory
}
