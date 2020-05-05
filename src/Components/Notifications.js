import React, { Component } from "react";

class Notifications extends Component {
  state = {};
  render() {
    const {
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
      <div>
        <p>
          notification: {notificationID}: (from {sender} to {getter})
        </p>
      </div>
    );
  }
}

export default Notifications;
