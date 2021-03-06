import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Link from "react-router-dom/Link";
import { Typography } from "@material-ui/core";

class Navbar extends Component {
  render() {
    return (
      <AppBar>
        <Toolbar>
          <Typography>Roommate Match</Typography>
          <Toolbar className={"nav-container"}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </Toolbar>
        </Toolbar>
      </AppBar>
    );
  }
}
export default Navbar;
