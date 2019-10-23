import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { thArray, tdArray } from "variables/Variables.jsx";
import {env} from "../environment";
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import Clock from 'react-live-clock';
import axios from 'axios';
// import { TableList } from "components/";
import {
  // dataPie,
  // legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";

var dataPie1 = {
  labels: [3, 1, 1],
  series: [3, 1, 1]
};
var legendPie1 = {
  names: ["Iowa", "Colorado", "California"],
  types: ["info", "danger", "warning"]
};

class FunctionalData extends Component {
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  componentWillMount(){
    const getUserURL = env.BASEV2;

    //getTotalUsers
    axios.get(getUserURL + "/getTotalUser", {}).then(response => {
      localStorage.setItem("totalUser",  JSON.stringify(response.data));
    })

    //getInactiveUsers
    axios.get(getUserURL + "/numberOfNotweetedPerson?k=100", {}).then(response => {
      localStorage.setItem("inactiveUser",  JSON.stringify(response.data));
    })

    //getfollowers
    axios.get(getUserURL + env.getFollower + localStorage.getItem("uid"), {}).then(response => {
      localStorage.setItem("followers",  JSON.stringify(response.data.length));
    })
    
    //getfollowing
    axios.get(getUserURL + env.getFollowing + localStorage.getItem("uid"), {}).then(response => {
      localStorage.setItem("following",  JSON.stringify(response.data.length));
    })
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Total users"
                statsValue={localStorage.getItem("totalUser")}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText={<span>Updated <Clock format={'HH:mm:ss'} timezone={'US/Pacific'} /></span>}
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-eye-slash text-danger" />}
                statsText="Inactive users"
                statsValue={localStorage.getItem("inactiveUser")}
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Last day"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-twitter text-info" />}
                statsText="Following"
                statsValue={localStorage.getItem("following")}
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText={<span>Updated <Clock format={'HH:mm:ss'} timezone={'US/Pacific'} /></span>}
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-users text-info" />}
                statsText="Followers"
                statsValue= {localStorage.getItem("followers")}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText={<span>Updated <Clock format={'HH:mm:ss'} timezone={'US/Pacific'} /></span>}
              />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Users Behavior"
                category="24 Hours performance"
                stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
            </Col>
            <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Location statistics"
                category=""
                stats={<span>Updated <Clock format={'HH:mm:ss'} timezone={'US/Pacific'} /></span>}
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={dataPie1} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie1)}</div>
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card
                id="chartActivity"
                title="Weekly active"
                category=""
                stats="Updated now"
                statsIcon="fa fa-check"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataBar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendBar)}</div>
                }
              />
            </Col>

            <Col md={6}>
              <Card
                  title="Users"
                  category=""
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
                                return <td key={key}>{prop}</td>;
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

export default FunctionalData;
