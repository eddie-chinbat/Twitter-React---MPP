import React, { Component } from "react";
import Button from "components/CustomButton/CustomButton.jsx";

const $ = window.$;
class Login extends Component {
  render() {
    return (
      <div className="content">
        <Button  bsStyle="info" pullRight fill type="submit">
          <span data-notify="icon" className="fa fa-twitter" /> &nbsp;
          LOGIN
        </Button>
      </div>
    );
  }
}
export default Login;