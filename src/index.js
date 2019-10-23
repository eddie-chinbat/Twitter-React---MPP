import React from "react";
import ReactDOM from "react-dom";
import App from "App.js";
import setAuthorizationToken from "setAuthorizationToken";
 
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import './assets/css/login.css';
import 'react-toastify/dist/ReactToastify.css';

setAuthorizationToken(localStorage.jwtToken);
ReactDOM.render(
  <App />, 
  document.getElementById('root')
);
