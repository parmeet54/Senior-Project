import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typorgraphy from "@material-ui/core/Typography";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
    minWidth: 500,
    maxWidth: 501,
    minHeight: 100,
    maxHeight: 151,
    borderRadius: 12,
  },
  content: {
    padding: 15,
    objectFit: "cover",
  },
};
class Notifications extends Component {
  state = {};
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      notifications: {
        getter,
        sender,
        createdAt,
        postID,
        type,
        read,
        notificationID,
      },
    } = this.props;
    //console.log();
    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typorgraphy variant="h5">
            <Typorgraphy
              variant="h5"
              component={Link}
              to={`/user/${sender}`}
              color="#3f51b5"
            >
              {sender}
            </Typorgraphy>{" "}
            has decided to {type} with you
          </Typorgraphy>
          <Typorgraphy variant="body1" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typorgraphy>
          {/* <Typorgraphy variant="body1" color="textPrimary">
            Notification ID:{notificationID}
          </Typorgraphy> */}
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Notifications);
