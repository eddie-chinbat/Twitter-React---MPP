import React, { Component } from "react";
import {FormGroup,FormControl, Row, Col, Grid} from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import ReactList from 'react-list';
import { Wall } from "components/Card/Wall.jsx";
import { Card } from "components/Card/Card";
import axios from 'axios';
import{env} from "../environment";
import { UserCard } from "components/UserCard/UserCard.jsx";
import avatar from "assets/img/faces/trump.jpg";
import { toast } from 'react-toastify';

const $ = window.$;

class Dashboard extends Component {
  constructor() {
    super();
    
    this.state = {
      aa: [],
  };
    this.handleChange = this.handleChange.bind(this);
    this.updateSubmit = this.updateSubmit.bind(this);
   
}

handleChange(e) {
  let target = e.target;
  let value = target.value; 
  let name = target.name;
  this.setState({
    [name]: value
  }); 
}

updateSubmit(e) {
  e.preventDefault();

  axios.post(env.BASE_WALL + env.tweetPost+localStorage.getItem("uid"), {
    tweetType: "tweet",
    postText: this.tweet.value
  }, { headers : { Authorization : "Bearer " + localStorage.getItem("jwtToken")}}).then(response => {
    if(response.data.postID > 0){
      toast.success("Posted !", {position: toast.POSITION.BOTTOM_RIGHT});
      this.getWall(localStorage.getItem("uid"));
    } else {
      toast.error("Could not post!. Please try again", {position: toast.POSITION.BOTTOM_RIGHT});
    }
  }).catch(error => {
    console.log("EEROOORRR : " + error);
  })

}

  limitTextSize(e) {
    var max = 140
    var txt = $("#textarea1").val();
    var left = txt.substring(0, max);
    var right = txt.substring(max);
    var html = left + '<span class="highlight">' + right + "</span>";
    $("#overflowText").html(html);
    $("#counter").html("Letters remaining: " + (max - txt.length));
    $("#doneButton").attr("disabled", txt.length > max);
}

maxLength(el) {
  if (!('maxLength' in el)) {
      var max = el.attributes.maxLength.value;
      el.onkeypress = function () {
          if (this.value.length >= max) return false;
      };
  }
}

// renderItem(index, key) {
//   return <div style={{color:"red"}} key={key}>
//     <Wall
//       statsIcon="fa fa-history"
//       id="chartHours"
//       title="tit"
//       category="cate"
//       stats="Updated 3 minutes ago"

//     />
//   </div>
// }
// componentWillMount()
// {
//   this.getWall(1);
// }


getWall(uid) {
axios.get(env.BASE_WALL + env.getWall + uid, {
  }).then(response => {
    this.setState({aa:response.data})
    localStorage.setItem("wall",  JSON.stringify(response.data));
    // console.log(response.data);
    //let aa = this.state.aa;
    //aa.push(response.data);
    
    
    //console.log(localStorage.getItem("wall").slice(1,-1).postID);


    // console.log(JSON.parse(localStorage.getItem("wall")).postID);
    
    
    // console.log(aa);
    // if(response.data.userid > 0){
    //   const token = response.data.token;
    //   const uid = response.data.userid;
    //   localStorage.setItem('uid', uid);
    //   localStorage.setItem('jwtToken', token);
    //   setAuthorizationToken(token);
    //   this.props.history.push("/admin/dashboard");
    //   // const authToken = localStorage.getItem("jwtToken");

    //   //get User info
    //   const getUserURL = env.BASE + env.getUser + uid;
    //   axios.get(getUserURL, { headers : { Authorization : "Bearer " + token}}).then(response => {
    //     localStorage.setItem("user",  JSON.stringify(response.data));
    //   })

    //   toast.success("Welcome " + this.state.userName + "!", {position: toast.POSITION.TOP_RIGHT});
    // } else {
    //   toast.error("Could not connect to server. Try again!!!", {position: toast.POSITION.TOP_RIGHT});
    //   console.log(response.data);
    // }
  })      
}

componentDidMount()
{
  this.getWall(localStorage.getItem("uid"));
}
  render() {
    
    return (
      <div>
      <div className="content">
        <form onSubmit={this.updateSubmit}>
          <FormGroup controlId="formControlsTextarea">
            <FormControl
              name="tweet"
              inputRef={(ref) => {this.tweet = ref}}
              rows="5"
              componentClass="textarea"
              bsClass="form-control"
              placeholder="What's happening?"
            />
          </FormGroup>
          <Button  bsStyle="info" pullRight fill type="submit" >
            <span data-notify="icon" className="fa fa-twitter" /> &nbsp;
            Tweet
          </Button>
        </form>
      </div>
      <br /><br /><br />
      <div class="authorWall">
      {this.state.aa.map((item=>(
             <Wall
             avatar={avatar}
             date= {item.postDate.substring(0,19).replace("T"," ")}
             userName= {"@"+item.userName}
             category=""
             description={item.postText}
             socials={
             <div>
               <span data-notify="icon" className="fa fa-heart" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;like&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <span data-notify="icon" className="fa fa-retweet" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Retweet&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <span data-notify="icon" className="fa fa-share" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Share
            </div>}
           />
           )
            
           ))  }
           </div>
        {/* <ReactList
          itemRenderer={this.renderItem}
          length={1}
          type='uniform'
        />
          </div> */}
      </div>
    );
  }
}

export default Dashboard;
