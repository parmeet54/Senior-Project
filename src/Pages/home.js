import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Profile from "../Components/Profile";

import NewPost from "../Components/NewPost";

import jwtDecode from "jwt-decode";
import UserProfile from "../Components/UserProfile";
import Notifications from "../Components/Notifications";

let authenticated;
let userID = "";
let notifications = null;
let info = null;
const token = localStorage.LoginToken;
if (token) {
  const decodedToken = jwtDecode(token);
  axios.defaults.headers.common["Authorization"] = localStorage.LoginToken;
  //
  console.log(`userID: ${decodedToken.user_id}`);
  userID = decodedToken.user_id;
  //this.setState({ userID });
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

class home extends Component {
  state = {
    profiles: null,
    userID: userID,
    notifications: [],
    info: null,
  };
  //retrieve all profiles from database
  componentDidMount() {
    axios
      .get("/getAllPosts")
      .then((res) => {
        console.log(res.data);
        this.setState({
          profiles: res.data,
        });
      })
      //in case of error
      .catch((err) => console.log(err));
    axios.get("/user").then((res) => {
      console.log(res.data);
      this.setState({
        info: res.data.info,
        notifications: res.data.notifications,
      });
      console.log(this.state.info);
      //console.log(this.state.notifications);
    });
  }

  render() {
    let recentProfileMarkup = this.state.profiles ? (
      //fetch the profiles information
      this.state.profiles.map((profile) => <Profile profile={profile} />)
    ) : (
      <p>Loading ...</p>
    );

    let noti = this.state.notifications ? (
      //fetch the profiles information
      this.state.notifications.map((notifications) => (
        <Notifications notifications={notifications} />
      ))
    ) : (
      <p>Loading ...</p>
    );

    return (
      //render the profiles as a grid
      <Grid container spacing={12}>
        <Grid item sm={12} xs={12}>
          {noti}
        </Grid>
        <Grid item sm={12} xs={12}>
          <NewPost userID={this.state.userID} />
        </Grid>
        <Grid item sm={12} xs={12}>
          {recentProfileMarkup}
        </Grid>
      </Grid>
    );
  }
}

export default home;
