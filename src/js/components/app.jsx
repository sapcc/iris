import React from "react";
import ReactDOM from 'react-dom';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'
import { logout } from '../actions/auth'
import ReactJson from 'react-json-view'

import MainNav from './navigation/main_nav'

import UserProfile from './user/profile'
import {AuthModal} from './auth/modal'

import SearchBar from '../components/search/bar'
import SearchResults from '../containers/search_results'
import ObjectDetails from '../containers/object_details'


const App = ({profile,login,logout,findObjects,updateSearchFilter,search}) => {

  return (
    <HashRouter /*hashType="noslash"*/ >

      <React.Fragment>
        <MainNav profile={profile}/>

        <SearchBar
          findObjects={findObjects}
          updateSearchFilter={updateSearchFilter}
          searchFilter={search.filter}
          isFetching={search.isFetching}/>

        <Route exact path="/login" render={props => (
          <AuthModal profile={profile} login={login} {...props}/>
        )}/>

        {!profile.isFetching && !profile.user
          ? <Redirect to="/login" push={false}/>
          : <Route exact path="/profile" render={props => (
            <UserProfile profile={profile} logout={logout} {...props}/>
          )}/>
        }

        <Switch>
          <Route exact path="/" component={SearchResults}/>
          <Route exact path="/objects/:id" component={ObjectDetails}/>
        </Switch>

        {search.isFetching && <Redirect to="/" push={false}/>}
      </React.Fragment>
    </HashRouter>
  )
}

export default App
