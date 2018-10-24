import React from "react";
import ReactDOM from 'react-dom';
import { HashRouter, Route, Redirect } from 'react-router-dom'
import { logout } from '../actions/auth'
import ReactJson from 'react-json-view'

import MainNav from './navigation/main_nav'

import UserProfile from './user/profile'
import {AuthModal} from './auth/modal'

import SearchBar from './search/search_bar'
import SearchResultsList from './search/search_results_list'


const Search = () => (
  <React.Fragment>
    <SearchBar/>
    <SearchResultsList/>
  </React.Fragment>
)

const App = ({profile,login,logout}) => {
  return (
    <HashRouter /*hashType="noslash"*/ >

      <React.Fragment>
        <MainNav profile={profile}/>

        <Route exact path="/login" render={props => (
          <AuthModal profile={profile} login={login} {...props}/>
        )}/>

        {!profile.isFetching && !profile.user
          ? <Redirect to="/login" push={false}/>
          : <Route exact path="/profile" render={props => (
            <UserProfile profile={profile} logout={logout} {...props}/>
          )}/>
        }

        <Route path="/" component={Search}/>
      </React.Fragment>
    </HashRouter>
  )
}

export default App
