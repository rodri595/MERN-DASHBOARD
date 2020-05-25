import React, { Component } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

//Rutas:
import Routes from "./routes";

const browserHistory = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Routes />
      </Router>
    );
  }
}

export default App;
