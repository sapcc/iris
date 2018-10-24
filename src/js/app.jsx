import React from "react";
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Link } from 'react-router-dom'

// import {Auth} from './components/auth/form'
import {AuthModal} from './components/auth/modal'

import MainNav from './components/navigation/main_nav'
import SearchBar from './components/search/search_bar'
import SearchResultsList from './components/search/search_results_list'


const Content = () => <span>Welcome to Iris</span>

const App = () => (
  <HashRouter /*hashType="noslash"*/ >

    <React.Fragment>
      <MainNav/>
      <Route path="/" component={Content}/>
      <Route exact path="/login" component={AuthModal}/>
      <Link to='/login'>Login</Link>
      <SearchBar/>
      <SearchResultsList/>
    </React.Fragment>
  </HashRouter>
)

export default App
