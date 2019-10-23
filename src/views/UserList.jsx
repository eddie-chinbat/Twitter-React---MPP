import React, { Component } from "react";
import { Grid, Row, Col, Table, Alert } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.test = this.test.bind(this);
    // this.test.value = "aa";
  }

  test() {
    console.log(this.test.key);
    console.log(window.location.hash.substr(1));
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="User lists to follow and follower"
                // category="Follow anyone"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {tdArray.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key} onClick={this.test}>{prop}</td>
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserList;
