import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Link from "react-router-dom/Link";
import { Typography } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotificationsIcon from "@material-ui/icons/Notifications";
import axios from "axios";

class NavbarIn extends Component {
  handelLogout = () => {
    window.location.href = "/login";
    // localStorage.removeItem("LoginToken");
    // delete axios.defaults.headers.common["Authorization"];
  };
  render() {
    return (
      <AppBar>
        <Toolbar>
          <Typography>Roommate Match </Typography>
          <Toolbar className={"nav-container"}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <IconButton color="inherit" component={Link} to="/notification">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
            <IconButton color="inherit" onClick={this.handelLogout}>
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </Toolbar>
      </AppBar>
    );
  }
}
export default NavbarIn;
