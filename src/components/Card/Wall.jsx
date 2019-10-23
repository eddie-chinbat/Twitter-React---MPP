import React, { Component } from "react";

export class Wall extends Component {
  render() {
    return (
      <div className="card card-user">
        <div className="content"><div className="contentWall">{this.props.date}</div>
        <div className="authorWall" >
        <table>
          <tr>
            <th>
              <img
                className="avatarWall border-gray"
                src={this.props.avatar}
                alt="..."
              />
              <h4 className="titleWall">
              {this.props.userName}</h4>
              </th>
            <th><p className="description text-left"><h3>{this.props.description}</h3></p></th> 
          </tr>
        </table>
          </div>
          
        </div>
        <hr />
        <h4><div className="text-center">{this.props.socials}</div></h4>
        <br />
      </div>
    );
  }
}

export default Wall;
