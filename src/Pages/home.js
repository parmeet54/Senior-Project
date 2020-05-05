import React, { Fragment, Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Profile from "../Components/PostCard";

import NewPost from "../Components/NewPost";

import jwtDecode from "jwt-decode";
import PostCard from "../Components/PostCard";
import Notifications from "../Components/Notifications";
import HomeProfile from "../Components/HomeProfile";
import Navbar from "../Components/Navbar";

let authenticated = false;
let userID = "";
let notifications = null;
let info = null;
const token = localStorage.LoginToken;
if (token) {
  const decodedToken = jwtDecode(token);
  axios.defaults.headers.common["Authorization"] = localStorage.LoginToken;

  authenticated = true;

  // console.log(`userID: ${decodedToken.user_id}`);
  // userID = decodedToken.user_id;
  // this.setState({ userID });
}

class home extends Component {
  state = {
    posts: null,
    userID: userID,
    notifications: [],
    info: {},
    authenticated: authenticated,
  };
  //retrieve all profiles from database
  componentDidMount() {
    axios
      .get("/getAllPosts")
      .then((res) => {
        console.log(res.data);
        this.setState({
          posts: res.data,
        });
      })
      //in case of error
      .catch((err) => console.log(err));

    axios.get("/user").then((res) => {
      console.log(res.data);
      this.setState({
        info: res.data.info,
        notifications: res.data.notifications,
        userID: res.data.userID,
      });
      console.log(this.state.info);
      //console.log(this.state.notifications);
    });

    //token expire
    if (jwtDecode(token).exp * 1000 < Date.now()) {
      window.location.href = "/login";
      this.setState({ authenticated: false });
      localStorage.removeItem("LoginToken");
      //delete axios.defaults.headers.common["Authorization"];
    }
  }

  render() {
    let recentPostsMarkup = this.state.posts ? (
      //fetch the profiles information
      this.state.posts.map((post) => <PostCard post={post} />)
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
      <Fragment>
        <Navbar />
        <Grid container spacing={12}>
          <Grid item sm={12} xs={12}>
            {noti}
          </Grid>
          <Grid item sm={8} xs={8}>
            <NewPost userID={this.state.userID} />
          </Grid>
          <Grid item sm={8} xs={8}>
            {recentPostsMarkup}
          </Grid>
          <Grid item sm={4} xs={6}>
            <HomeProfile
              info={this.state.info}
              authenticated={this.state.authenticated}
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default home;
