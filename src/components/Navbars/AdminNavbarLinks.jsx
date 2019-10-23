import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import SearchField from "react-search-field";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

class AdminNavbarLinks extends Component {

  handleClick = () => {
    localStorage.clear();
    // this.props.history.push("/login");
    window.location.assign("/login");
  }

  render() {
    const notification = (
      <div>
        <i className="fa fa-globe" />
        <b className="caret" />
        <span className="notification">2</span>
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    );
    const search = (
      <div>
        <i className="fa fa-search" />
        <p className="hidden-lg hidden-md">Search</p>
      </div>
    );
    return (
      <div>
        <Nav pullRight>
           {/* <NavDropdown
              eventKey={2}
              title={search}
              noCaret
              id="basic-nav-dropdown"
            >
              <SearchField placeholder="Search..."
                // onChange={onChange}
                // searchText="my tweet"
                // classNames="test-class"
              />
          </NavDropdown> */}
          <NavDropdown
              eventKey={2}
              title={notification}
              noCaret
              id="basic-nav-dropdown"
            >
              <MenuItem eventKey={2.1}>Edy followed you</MenuItem>
              <MenuItem eventKey={2.2}>Tamir unfollowed you</MenuItem>
          </NavDropdown>

          <NavItem eventKey={1} onClick={this.handleClick}>
            <i className="fa fa-sign-out"/>
            <p className="hidden-lg hidden-md">Sign out</p>
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default AdminNavbarLinks;
