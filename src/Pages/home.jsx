import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Profile from "../Components/Profile";

class home extends Component {
  state = {
    profiles: null,
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
  }
  render() {
    let recentProfileMarkup = this.state.profiles ? (
      //fetch the profiles information
      this.state.profiles.map((profile) => <Profile profile={profile} />)
    ) : (
      <p>Loading ...</p>
    );
    return (
      //render the profiles as a grid
      <Grid container spacing={12}>
        <Grid item sm={12} xs={12}>
          {recentProfileMarkup}
        </Grid>
      </Grid>
    );
  }
}

export default home;
