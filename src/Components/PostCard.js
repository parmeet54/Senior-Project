import React, { Component } from "react";
//import material ui componets
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typorgraphy from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

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

class PostCard extends Component {
  handelMatch = (postID) => {
    axios.get(`/postNew/${postID}/match`);
  };
  handelUnmatch = (postID) => {
    axios.get(`/postNew/${postID}/unmatch`);
  };
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      post: {
        postId,
        body,
        userName,
        imageUrl,
        matchCount,
        commentCount,
        createdAt,
      },
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
            to={`/user/${userName}`}
            color="#3f51b5"
          >
            {userName}
          </Typorgraphy>
          <Typorgraphy variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typorgraphy>
          <Typorgraphy paragraph>{body}</Typorgraphy>
          <Typorgraphy variant="body2" color="textSecondary">
            Matches: {matchCount}
          </Typorgraphy>

          <Button
            variant="contained"
            color="primary"
            onClick={this.handelMatch.bind(this, postId)}
          >
            match
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handelUnmatch.bind(this, postId)}
          >
            unmatch
          </Button>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(PostCard);
