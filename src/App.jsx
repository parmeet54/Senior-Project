import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import home from "./Pages/home";
import login from "./Pages/login";
import signup from "./Pages/signup";
import Navbar from "./Components/Navbar";
import "./App.css";

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
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
