import axios from 'axios';
import {
  REQUEST_OBJECT,
  REQUEST_OBJECT_FAILURE,
  RECEIVE_OBJECT
} from '../constants'

const errorMessage = (error) =>
  error.response && error.response.data || error.message

//################ PROFILE #################
const requestObject = (id) => (
  {
    type: REQUEST_OBJECT,
    requestedAt: Date.now(),
    id
  }
)

const requestObjectFailure = (id,error) => (
  {
    type: REQUEST_OBJECT_FAILURE,
    id,
    error
  }
)

const receiveObject = (item) => (
  {
    type: RECEIVE_OBJECT,
    receivedAt: Date.now(),
    item
  }
)

const loadObject = (id) => (
  (dispatch) => {
    dispatch(requestObject(id))
    axios.get(`/api/lookup/objects/${id}`).then(response => {
      dispatch(receiveObject(response.data))
    }).catch(error => {
      dispatch(requestObjectFailure(id,errorMessage(error)))
    })
  }
)

const loadObjectOnce = (id) =>
  (dispatch,getState) => {
    let index = getState().objects.findIndex(i =>i.id==id)
    if(index<0) dispatch(loadObject(id))
  }


export {
  loadObject,
  loadObjectOnce,
  receiveObject
}
