import React from "react";
import { Link } from 'react-router-dom'


export default () =>
  <nav className= "navbar navbar-fixed-top navbar-inverse navbar-sap" >
    <div className="container-fluid">
      <a className="navbar-brand" href="https://iris.qa-de-1.cloud.sap/monsoon3">
        <div className="logo"></div>
        Iris
      </a>
      <Link to='/login'>Login</Link>
    </div>
  </nav>
