import React, { Component } from "react";
import LoginForm from "./LoginForm";

export class Login extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-offset-4">
          <LoginForm />
        </div>

        <div className="image">
          <img src={this.props.bgImage} alt="..."/>
        </div>
        <div className="content">
          <div className="author" >
              <img
                className="avatar border-gray"
                src={this.props.avatar}
                alt="..."
              />
              <h4 className="title">
                {this.props.name}
                <br />
                <small>{this.props.userName}</small>
              </h4>
          </div>
          <p className="description text-center">{this.props.description}</p>
        </div>
        <hr />
        <div className="text-center">{this.props.socials}</div>
      </div>
    );
  }
}

export default UserCard;
