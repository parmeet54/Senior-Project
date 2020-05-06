import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typorgraphy from "@material-ui/core/Typography";
import PostCard from "../Components/PostCard";
import Grid from "@material-ui/core/Grid";
import Navbar from "./Navbar";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = {
  card: {
    display: "fixed",
    maxWidth: 500,
    minWidth: 499,
    minHeight: 599,
    maxHeight: 600,
    borderRadius: 12,
    wordwrap: true,
  },
  image: {
    maxWidth: 500,
    minWidth: 499,
    minHeight: 149,
    maxHeight: 150,

    padding: 150,
  },
  content: {
    padding: 20,
  },
};

class Account extends Component {
  render() {
    const {
      classes,
      account: {
        priceHigh,
        bio,
        imageUrl,
        handel,
        gender,
        location,
        priceLow,
        age,
      },
      posts,
    } = this.props;

    let recentPostsMarkup = posts ? (
      //fetch the profiles information
      posts.map((post) => <PostCard post={post} />)
    ) : (
      <LinearProgress />
    );
    return (
      <Fragment>
        <Fragment>
          <Navbar />
        </Fragment>
        <Grid container spacing={1}>
          <Grid item sm={6} xs={6}>
            <Card className={classes.card}>
              <CardMedia
                image={imageUrl}
                title="ProfilePicture"
                className={classes.image}
              />
              <CardContent className={classes.content}>
                <Typorgraphy variant="h3">{handel}</Typorgraphy>
                <Typorgraphy variant="body2" color="textSecondary">
                  Location: {location}
                </Typorgraphy>
                <Typorgraphy variant="body2" color="textSecondary">
                  Age: {age}
                </Typorgraphy>
                <Typorgraphy variant="body2" color="textSecondary">
                  Gender: {gender}
                </Typorgraphy>
                <Typorgraphy variant="body2" color="textSecondary">
                  Looking for a place:$ {priceLow} - ${priceHigh}
                </Typorgraphy>
                <Typorgraphy variant="body1" wordwrap="true">
                  {bio};{" "}
                </Typorgraphy>
              </CardContent>
            </Card>
          </Grid>

          <Grid item sm={6} xs={6} spacing={1}>
            {recentPostsMarkup}
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Account);
