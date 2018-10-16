import React from "react";
import ReactDOM from 'react-dom';

import MainNav from './components/navigation/main_nav'

const App = (props) =>
  <React.Fragment>
    <MainNav/>
    Welcome to Iris
  </React.Fragment>
ReactDOM.render(<App/>, document.getElementById('react-content'))
