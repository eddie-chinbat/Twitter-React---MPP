import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import{env} from "../../environment";
import axios from 'axios';
import { toast } from 'react-toastify';
// import { throwStatement } from '@babel/types';
// import { object } from 'prop-types';
// import {ToastsContainer, ToastsStore, ToastStore, ToastContainer, toast} from 'react-toasts';
import Button from "components/CustomButton/CustomButton.jsx";

class SignUpForm extends Component {
    constructor() {
        super();
        // let today = new Date().toLocaleString();
        
        this.state = {
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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
      let target = e.target;
      let value = target.value; // === 'checkbox' ? target.checked : target.value;
      let name = target.name;

      this.setState({
        [name]: value
      });
  }

    handleSubmit(e) {
        e.preventDefault();
        // console.log("name : " + this.state.userName);
        // console.log("email : " + this.state.email);
        // console.log("pass : " + this.state.userpassword);
        // console.log("URL : " + env.BASE + env.signup);
        axios.post(env.BASE + env.signup, {
          userName: this.state.userName,
          userpassword: this.state.userpassword,
          email: this.state.email,
          firstName: this.state.userName,
          location: "Fairfield, IOWA, USA, 52557",
          isActive: 1
        }).then(response => {
          if(response.data == "SUCCESS"){
            toast.success("Successfully registered !", {position: toast.POSITION.BOTTOM_RIGHT});
            this.props.history.push("/login");
          } else {
            toast.error("Could not registered!. Please try again", {position: toast.POSITION.BOTTOM_RIGHT});
          }
        }).catch(error => {
          console.log("EEROOORRR : " + error);
        })
    }

    render() {
        return (
        <div className="App">
        <div className="App__Aside">
          <svg class="twitterIcon-bird" viewBox="0 0 800 982" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="Artboard" transform="translate(-286.000000, -117.000000)" fill="#1B95E0">
            <path d="M1493.75308,233.195911 C1449.31783,252.922544 1401.56126,266.207828 1351.43951,272.19627 C1402.61804,241.549536 1441.92034,192.987798 1460.3889,135.116296 C1412.53168,163.498493 1359.49119,184.130942 1303.02874,195.252335 C1257.88897,147.093181 1193.42514,117 1122.16771,117 C962.190754,117 844.636121,266.258151 880.768067,421.202806 C674.896491,410.886582 492.324484,312.253414 370.089808,162.341063 C305.17308,273.705962 336.423691,419.391176 446.731805,493.16476 C406.171431,491.856361 367.925917,480.734968 334.561738,462.165765 C331.844294,576.95263 414.122472,684.342008 533.287442,708.245454 C498.413572,717.706186 460.218381,719.9204 421.368991,712.47259 C452.871217,810.904465 544.358512,882.514158 652.854997,884.52708 C548.686294,966.201382 417.443793,1002.68559 286,987.186091 C395.653915,1057.48739 525.940278,1098.50067 665.838342,1098.50067 C1125.89162,1098.50067 1385.81015,709.956437 1370.10936,361.469352 C1418.52012,326.494836 1460.53987,282.864756 1493.75308,233.195911 Z" id="bird"></path>
            </g>
          </svg>
          <div className="App__Aside_content">
            <div className="logincontent">
              <span class="fa fa-search"></span>&emsp;&emsp;Follow us.<br/>
              <span class="fa fa-users"></span>&emsp;&emsp;Hear what people are talking about.<br/>
              <span class="fa fa-graduation-cap"></span>&emsp;&emsp;Now available for MUM students.<br/>
            </div>
          </div>
        </div>
        <div className="App__Form">
        <div className="PageSwitcher">
            <NavLink exact to="/login" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
            <NavLink to="/register" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
          </div>
        <div className="FormCenter">
          <div className="logincontentlogo"><span data-notify="icon" className="fa fa-twitter fa-3x" />&emsp;&emsp;<div class="loginslogan">Join us now.</div></div><br/><br/><br/>
            <form onSubmit={this.handleSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" >Full Name</label>
                <input required type="text" id="name" className="FormField__Input" placeholder="Enter your full name" name="userName" onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label">E-Mail Address</label>
                <input required type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label">Password</label>
                <input required type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="userpassword" value={this.state.password} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                  <button className="FormField__Button mr-20">Register</button> <Link to="/login" className="FormField__Link">I'm already member</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
        );
    }
}

export default SignUpForm;
