import React from "react";
import { Link } from 'react-router-dom'


export default ({profile}) =>
  <nav className= "navbar navbar-fixed-top navbar-inverse navbar-sap" >
    <div className="container-fluid">
      <a className="navbar-brand" href="https://iris.qa-de-1.cloud.sap">
        <div className="logo"></div>
        Iris
      </a>

      {profile.isFetching ?
        <span className='fas fa-spinner fa-pulse'></span>
        :
        profile.user
          ? <React.Fragment>
              <Link to='/profile'>Profile</Link>
            </React.Fragment>
          : <Link to='/login'>Login</Link>
      }
    </div>
  </nav>
