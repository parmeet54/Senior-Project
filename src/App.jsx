import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import home from "./Pages/home";
import login from "./Pages/login";
import signup from "./Pages/signup";
import profile from "./Components/Profile";
import Navbar from "./Components/Navbar";
import NavbarIn from "./Components/NavbarIn";

import jwtDecode from "jwt-decode";
import axios from "axios";
import AuthRoute from "./Util/AuthRoute";

axios.default.baseURL =
  "https://us-central1-roommate-5923e.cloudfunctions.net/api";

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decToken = jwtDecode(token);
  if (decToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          {authenticated ? <NavbarIn /> : <Navbar />}
          {/* <NavbarIn /> */}
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute
                exact
                path="/login"
                component={login}
                authenticated={authenticated}
              />
              <AuthRoute
                exact
                path="/signup"
                component={signup}
                authenticated={authenticated}
              />
              <Route exact path="/profile" component={profile} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
