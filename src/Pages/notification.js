import React, { Fragment, Component } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Notifications from "../Components/Notifications";
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
    userID: userID,
    notifications: [],
    info: {},
  };
  //retrieve all notifications from database
  componentDidMount() {
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
 
    let noti = this.state.notifications ? (
      //fetch the information within notifications
      this.state.notifications.map((notifications) => (
        <Notifications notifications={notifications} />
      ))
    ) : (
      <p>Loading ...</p>
    );

    return (
      //render the notifications to screen
      <Fragment>
        <Navbar />
            {noti}
      </Fragment>
    );
  }
}

export default home;
