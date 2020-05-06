import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import home from "./Pages/home";
import login from "./Pages/login";
import signup from "./Pages/signup";
import profile from "./Pages/profile";
import user from "./Pages/user";
import notification from "./Pages/notification";

// let authenticated;
// const token = localStorage.LoginToken;
// let userID = "";

// if (token) {
//   const decodedToken = jwtDecode(token);
//   console.log(decodedToken.user_id);
//   userID = decodedToken.user_id;
//   if (decodedToken.exp * 1000 < Date.now()) {
//     window.location.href = "/login";
//     authenticated = false;
//   } else {
//     window.location.href = "/";
//     authenticated = true;
//   }
// }

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <div className="container">
            <Switch>
              <Route exact path="/" component={login} />
              <Route exact path="/home" component={home} />
              <Route exact path="/signup" component={signup} />
              <Route exact path="/profile" component={profile} />
              <Route exact path="/user/:handel" component={user} />
              <Route exact path="/notification" component={notification} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
