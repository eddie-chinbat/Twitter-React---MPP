import React, {Component} from "react";
import SignUpForm from './views/auth/SignUpForm';
import SignInForm from './views/auth/SignInForm';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.jsx";
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import './assets/css/login.css';

class App extends Component{
  render(){
    return (
      <BrowserRouter>
      <ToastContainer />
      <Switch>
        <Route exact path="/" render={props => <SignInForm {...props} />} />
        <Route exact path="/login" render={props => <SignInForm {...props} />} />
        <Route exact path="/register" render={props => <SignUpForm {...props} />} />
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </BrowserRouter>
    );
  }
}
export default App;