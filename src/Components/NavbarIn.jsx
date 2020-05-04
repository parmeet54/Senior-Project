import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Link from "react-router-dom/Link";
import { Typography } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

class NavbarIn extends Component {
  render() {
    return (
      <AppBar>
        <Toolbar>
          <Typography>Roommate Match </Typography>
          <Toolbar className={"nav-container"}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <IconButton color="inherit" component={Link} to={"/profile"}>
              <AccountCircle />
            </IconButton>
            <IconButton color="inherit" component={Link} to={"/login"}>
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </Toolbar>
      </AppBar>
    );
  }
}
export default NavbarIn;
