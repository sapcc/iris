import { combineReducers } from 'redux'
import profile from './profile'
import objects from './objects'
import dependencies from './dependencies'
import search from './search'

export default combineReducers({
  profile,
  objects,
  search,
  dependencies
})
