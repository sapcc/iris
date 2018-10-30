import axios from 'axios';
import {
  REQUEST_DEPENDENCIES,
  REQUEST_DEPENDENCIES_FAILURE,
  RECEIVE_DEPENDENCIES
} from '../constants'

const errorMessage = (error) =>
  error.response && error.response.data || error.message

//################ Search #################
const requestDependencies = (id) => (
  {
    type: REQUEST_DEPENDENCIES,
    id
  }
)

const requestDependenciesFailure = (id,error) => (
  {
    type: REQUEST_DEPENDENCIES_FAILURE,
    id,
    error
  }
)

const receiveDependencies = (id,items) => (
  {
    type: RECEIVE_DEPENDENCIES,
    id,
    items
  }
)

const loadDependencies = (id) =>
  (dispatch) => {
    dispatch(requestDependencies(id))
    axios.get(`/api/lookup/objects/${id}/dependencies`)
    .then(response => dispatch(receiveDependencies(id,response.data)))
    .catch(error => dispatch(requestDependenciesFailure(id,errorMessage(error))))
  }
;

const loadDependenciesOnce = (id) =>
  (dispatch,getState) => {
    let dependencies = getState().dependencies[id]
    if(!dependencies) dispatch(loadDependencies(id))
  }

export {
  loadDependencies,
  loadDependenciesOnce
}
