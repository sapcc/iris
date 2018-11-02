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
        <i className='fas fa-spinner fa-pulse'></i>
        :
        profile.user
          ?
          <Link className="profile-link" to='/profile'><img className="avatar" src={`https://avatars.wdf.sap.corp/avatar/${profile.user.name}?size=25x25`}/></Link>
          :
          <Link to='/login'>Login</Link>
      }
    </div>
  </nav>
