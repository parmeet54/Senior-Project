import React, { Component } from "react";
//import material ui componets
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typorgraphy from "@material-ui/core/Typography";

import Link from "react-router-dom/Link";
import axios from "axios";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
    minWidth: 500,
    minHeight: 150,
    borderRadius: 12,
  },
  image: {
    minWidth: 150,
    maxHeight: 150,
  },
  content: {
    padding: 15,
    objectFit: "cover",
  },
};

class Profile extends Component {
  handelMatch = (postID) => {
    axios.get(`/postNew/${postID}/match`);
  };
  handelUnmatch = (postID) => {
    axios.get(`/postNew/${postID}/unmatch`);
  };
  render() {
    const {
      classes,
      profile: { postId, body, userName, imageUrl, matchCount, commentCount },
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={imageUrl}
          title="ProfilePicture"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typorgraphy
            variant="h5"
            component={Link}
            to={"/users/${userName}"}
            color="#3f51b5"
          >
            {userName}
          </Typorgraphy>
          <Typorgraphy paragraph>{body}</Typorgraphy>
          <Typorgraphy variant="body2" color="textSecondary">
            Matches: {matchCount}
          </Typorgraphy>
          <Typorgraphy variant="body2" color="textSecondary">
            Comments: {commentCount}
          </Typorgraphy>
          <button onClick={this.handelMatch.bind(this, postId)}>match</button>
          <button onClick={this.handelUnmatch.bind(this, postId)}>
            unmatch
          </button>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Profile);
