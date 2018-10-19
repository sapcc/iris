import ReactDOM from 'react-dom';
import React from "react";
import "./scss/base.scss"
import App from './js/app';

console.log('process.env.IDENTITY_ENDPOINT',process.env.IDENTITY_ENDPOINT)
console.log('process.env.CLICOLOR',process.env.CLICOLOR)
ReactDOM.render(<App/>, document.getElementById('react-content') )
