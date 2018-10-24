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
        <React.Fragment><span className='spinner'></span> Loading...</React.Fragment>
        :
        profile.user
          ? <React.Fragment>
              <Link className='text-light' to='/profile'>Profile</Link>
            </React.Fragment>
          : <Link className='text-light' to='/login'>Login</Link>
      }
    </div>
  </nav>
