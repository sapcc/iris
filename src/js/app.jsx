import React from "react";
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Link } from 'react-router-dom'

// import {Auth} from './components/auth/form'
import {AuthModal} from './components/auth/modal'

import MainNav from './components/navigation/main_nav'
import SearchBar from './components/search/search_bar'
import SearchResultsList from './components/search/search_results_list'


const Search = () => (
  <React.Fragment>
    <SearchBar/>
    <SearchResultsList/>
  </React.Fragment>
)

const App = () => (
  <HashRouter /*hashType="noslash"*/ >
    <React.Fragment>
      <MainNav/>
      <Route path="/" component={Search}/>
      <Route exact path="/login" component={AuthModal}/>
    </React.Fragment>
  </HashRouter>
)

export default App
