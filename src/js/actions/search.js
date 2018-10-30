import axios from 'axios';
import {
  REQUEST_SEARCH,
  REQUEST_SEARCH_FAILURE,
  RECEIVE_SEARCH_RESULTS,
  EXTEND_SEARCH_HISTORY
} from '../constants'

const errorMessage = (error) =>
  error.response && error.response.data || error.message

//################ Search #################
const requestSearch = (filter) => (
  {
    type: REQUEST_SEARCH,
    requestedAt: Date.now(),
    filter
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

let timer;

const findObjects = (filter) =>
  (dispatch) => {
    dispatch(requestSearch(filter))

    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      axios.get(`/api/lookup/search`, {params: filter})
      .then(response => dispatch(receiveSearchResults(response.data)))
      .catch(error => dispatch(requestSearchFailure(errorMessage(error))))
    }, 100)
  }
;

export {
  findObjects,
  extendHistory
}
