import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import home from "./Pages/home";
import login from "./Pages/login";
import signup from "./Pages/signup";
import profile from "./Pages/profile";
import Navbar from "./Components/Navbar";
import jwtDecode from "jwt-decode";

import axios from "axios";

axios.default.baseURL =
  "https://us-central1-roommate-5923e.cloudfunctions.net/api";

let authenticated;
const token = localStorage.FBIdtoken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
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
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
              <Route exact path="/profile" component={profile} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
