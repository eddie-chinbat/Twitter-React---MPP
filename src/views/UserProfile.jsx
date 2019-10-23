import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Table,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import {dataSales, 
         optionsSales, 
         responsiveSales,
         legendSales,
         dataBar, 
         optionsBar, 
         responsiveBar, 
         legendBar} from "variables/Variables.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import avatar from "assets/img/faces/edy.jpg";
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import ChartistGraph from "react-chartist";
import axios from 'axios';
import {env} from "../environment";
import { toast } from 'react-toastify';
import 'react-web-tabs/dist/react-web-tabs.css';
import { Wall } from "components/Card/Wall.jsx";

class UserProfile extends Component {
  constructor() {
    super();
    // let today = new Date().toLocaleString();
    
    this.state = {
      aa: [],
      // userName: null,
      // password: null,
      // firstName: null,
      // lastName: null,
      // birthDay: null,
      // location: null,
      // isActive: 0,
      // createdDate: null
  };
    this.handleChange = this.handleChange.bind(this);
    this.updateSubmit = this.updateSubmit.bind(this);
}

handleChange(e) {
  let target = e.target;
  let value = target.value; // === 'checkbox' ? target.checked : target.value;
  let name = target.name;

  this.setState({
    [name]: value
  });
}

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

getWall(uid) {
  axios.get(env.BASE_WALL + env.getMyTweet + uid, {
    }).then(response => {
      this.setState({aa:response.data})
      // localStorage.setItem("wall",  JSON.stringify(response.data));
    })      
  }

  updateSubmit(e) {
    e.preventDefault();
    axios.post(env.BASE + env.userUpdate, {
      userid: JSON.parse(localStorage.getItem("user")).userid,
      email: this.email.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      // userpassword: this.newPassword.value,
      location: this.location.value,
      birthday: this.birthday.value,
      isActive: 1
    }, { headers : { Authorization : "Bearer " + localStorage.getItem("jwtToken")}}).then(response => {
      if(response.data == "UPDATED"){
        toast.success("Updated!", {position: toast.POSITION.BOTTOM_RIGHT});
      } else {
        toast.error("Could not update!. Please try again", {position: toast.POSITION.BOTTOM_RIGHT});
      }
    })
}

componentDidMount()
{
  this.getWall(localStorage.getItem("uid"));
}

  render() {
  var getUser = JSON.parse(localStorage.getItem("user"));
    return (
      <div className="content">
        <Grid fluid>
          <Row>
          <Col>
              <UserCard
                bgImage="http://www.kabu-load.net/data/out/1/IMG_444.jpg"
                avatar={avatar}
                name={getUser.userName}
                userName={"@"+getUser.userName}
                description={
                  <span>
                    Compro student
                    <br />
                    MUM
                    <br />
                    {getUser.location}
                    <div>
                      <span class = "following"><b>{getUser.followingCount}</b></span> Following
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <span class = "follower"><b>{getUser.followerCount}</b></span> Followers<br /><br />
                      <Tabs defaultTab="myAnalysis">
                        <TabList>
                          <Tab tabFor="myTweets">Tweets</Tab>
                          <Tab tabFor="profileEdit">Profile Edit</Tab>
                          <Tab tabFor="myAnalysis">Analysis</Tab>
                        </TabList>
                      
                        <TabPanel tabId="myTweets">
                          <Grid fluid>
                              <br/>

                          <div class="authorWall">
                              {this.state.aa.map((item=>(
                                    <Wall
                                    avatar={avatar}
                                    date= {item.postDate.substring(0,19).replace("T"," ")}
                                    userName= {"@"+getUser.userName} //{"@"+getUser.userName}
                                    category=""
                                    description={item.postText}
                                    socials={
                                    <div> 
                                      <span data-notify="icon" className="fa fa-heart" />&nbsp;&nbsp;&nbsp;&nbsp;like &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                                      <span data-notify="icon" className="fa fa-retweet" />&nbsp;&nbsp;&nbsp;&nbsp;Retweet &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                                      <span data-notify="icon" className="fa fa-share" />&nbsp;&nbsp;&nbsp;&nbsp;Share </div>}
                                  />
                                  )
                                    
                                  ))  }
                                  </div>


                            </Grid>
                        </TabPanel>
                      
                        <TabPanel tabId="profileEdit">
                          <Card content={
                              <form onSubmit={this.updateSubmit}>
                                <Row>
                                  <Col md={6}>
                                    <FormGroup controlId="formControlsTextarea">
                                      <ControlLabel>User ID</ControlLabel>
                                      <FormControl
                                        disabled
                                        name= "userid"
                                        inputRef={(ref) => {this.userid = ref}}
                                        bsClass="form-control"
                                        placeholder="Your id"
                                        defaultValue = {"@" + getUser.userName}
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col md={6}>
                                    <FormGroup controlId="formControlsTextarea">
                                      <ControlLabel>Email</ControlLabel>
                                      <FormControl
                                        name= "email"
                                        inputRef={(ref) => {this.email = ref}}
                                        bsClass="form-control"
                                        placeholder="your email"
                                        defaultValue = {getUser.email}
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md={4}>
                                    <FormGroup controlId="formControlsTextarea">
                                      <ControlLabel>First name</ControlLabel>
                                      <FormControl
                                        name= "firstName"
                                        inputRef={(ref) => {this.firstName = ref}}
                                        bsClass="form-control"
                                        placeholder="Your First name"
                                        defaultValue = {getUser.firstName}
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col md={4}>
                                    <FormGroup controlId="formControlsTextarea">
                                      <ControlLabel>Last name</ControlLabel>
                                      <FormControl
                                        name= "lastName"
                                        inputRef={(ref) => {this.lastName = ref}}
                                        bsClass="form-control"
                                        placeholder="your last name"
                                        defaultValue = {getUser.lastName}
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col md={4}>
                                    <FormGroup controlId="formControlsTextarea">
                                      <ControlLabel>Birthday</ControlLabel>
                                      <FormControl
                                        name= "birthday"
                                        inputRef={(ref) => {this.birthday = ref}}
                                        bsClass="form-control"
                                        placeholder="YYYY-MM-DD"
                                        defaultValue = "2019-10-15"
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md={6}>
                                    <FormGroup controlId="formControlsTextarea">
                                      <ControlLabel>New Password</ControlLabel>
                                      <FormControl
                                        disabled
                                        type="password"
                                        name= "newPassword"
                                        inputRef={(ref) => {this.newPassword = ref}}
                                        bsClass="form-control"
                                        placeholder="New Password"
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col md={6}>
                                    <FormGroup controlId="formControlsTextarea">
                                      <ControlLabel>Confirm password</ControlLabel>
                                      <FormControl
                                        disabled
                                        type="password"
                                        name= "confirmPassword"
                                        inputRef={(ref) => {this.confirmPassword = ref}}
                                        bsClass="form-control"
                                        placeholder="Confirm your password"
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md={12}>
                                    <FormGroup controlId="formControlsTextarea">
                                      <ControlLabel>Location</ControlLabel>
                                      <FormControl
                                        name= "location"
                                        inputRef={(ref) => {this.location = ref}}
                                        componentClass="textarea"
                                        bsClass="form-control"
                                        placeholder="Your location"
                                        defaultValue= {getUser.location}
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Button bsStyle="info" pullRight fill type="submit">
                                  Update Profile
                                </Button>
                                <div className="clearfix" />
                              </form>
                            }
                          />
                        </TabPanel>
                      
                        <TabPanel tabId="myAnalysis">
                          <br/>
                          <Grid fluid>
                            <Row>
                              <Col md={6}>
                                <StatsCard
                                  bigIcon={<i className="fa fa-twitter text-info" />}
                                  statsText="Following"
                                  statsValue={getUser.followingCount}
                                  statsIcon={<i className="fa fa-clock-o" />}
                                  statsIconText="In the last day"
                                />
                              </Col>
                              <Col md={6}>
                                <StatsCard
                                  bigIcon={<i className="fa fa-users text-info" />}
                                  statsText="Followers"
                                  statsValue={"+" + getUser.followerCount}
                                  statsIcon={<i className="fa fa-clock-o" />}
                                  statsIconText="In the last 3 days"
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col md={7}>
                                <Card
                                  statsIcon="fa fa-history"
                                  id="chartHours"
                                  title="Tweet performance"
                                  category="24 hours"
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
                              <Col md={5}>
                                <Card
                                  id="chartActivity"
                                  title="Activity"
                                  category="Follower and following"
                                  stats="Updated 5 minutes ago"
                                  statsIcon="fa fa-history"
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
                            </Row>
                          </Grid>
                        </TabPanel>
                      </Tabs>
                    </div>
                  </span>
                }
              />
            </Col>
          </Row>
          </Grid>
      </div>
    );
  }
}

export default UserProfile;
