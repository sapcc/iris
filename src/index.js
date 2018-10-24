import ReactDOM from 'react-dom';
import React from "react";
import "./scss/base.scss"
import App from './js/containers/app';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './js/reducers'
import { loadUserProfile } from './js/actions/auth'

// add logger middleware to redux
const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

// create store
const store = createStore(
  reducers,
  applyMiddleware(...middleware)
)

// try to load user profile
store.dispatch(loadUserProfile())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-content')
)
