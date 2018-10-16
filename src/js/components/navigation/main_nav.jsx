import React from "react";

export default () =>
  <nav className= "navbar navbar-fixed-top navbar-inverse navbar-sap" >
    <div className="container">
      <div className="navbar-header">

        <a className="navbar-brand" href="https://iris.qa-de-1.cloud.sap/monsoon3">
          <div className="logo"></div>
          Iris
        </a>
      </div>
      <div className="collapse navbar-collapse" id="main-nav-collapse">
        <ul className="nav navbar-nav">
          <li>
            <a href="/monsoon3">monsoon3</a>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a id="navbar-login-btn" href="/monsoon3/home">Log in</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
