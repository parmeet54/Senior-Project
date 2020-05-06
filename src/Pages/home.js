import React, { Fragment, Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";

import NewPost from "../Components/NewPost";

import jwtDecode from "jwt-decode";
import PostCard from "../Components/PostCard";

import HomeProfile from "../Components/HomeProfile";
import Navbar from "../Components/Navbar";

let authenticated = false;

if (localStorage.LoginToken) {
  const decodedToken = jwtDecode(localStorage.LoginToken);
  axios.defaults.headers.common["Authorization"] = localStorage.LoginToken;

  authenticated = true;

  // console.log(`userID: ${decodedToken.user_id}`);
  // userID = decodedToken.user_id;
  // this.setState({ userID });
}

class home extends Component {
  state = {
    posts: null,
    userID: null,
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
        notifications: res.data.notifications,
        userID: res.data.userID,
        info: res.data.info,
      });
      console.log(this.state.info);
      //console.log(this.state.notifications);
    });

    //token expire
    if (jwtDecode(localStorage.LoginToken).exp * 1000 < Date.now()) {
      window.location.href = "/";
      this.setState({ authenticated: false });
      localStorage.removeItem("LoginToken");
      delete axios.defaults.headers.common["Authorization"];
    }
  }

  render() {
    let recentPostsMarkup = this.state.posts ? (
      //fetch the profiles information
      this.state.posts.map((post) => <PostCard post={post} />)
    ) : (
      <LinearProgress />
    );

    let homeProfileMarkup = this.state.posts ? (
      //fetch the profiles information
      <HomeProfile
        info={this.state.info}
        authenticated={this.state.authenticated}
      />
    ) : (
      <CircularProgress color="secondary" />
    );

    return (
      //render the profiles as a grid
      <Fragment>
        <Navbar info={this.state.info} />

        <Grid container spacing={6}>
          <Grid item sm={8} xs={8}>
            <NewPost userID={this.state.userID} />
            {recentPostsMarkup}
          </Grid>

          <Grid item sm={4} xs={6} spacing={6}>
            {homeProfileMarkup}
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default home;
