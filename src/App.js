import React from "react";
import "./App.css";
import "./index.css";
import FinalModel from "./FinalModel";
import { HashRouter as Router, Link, Route } from "react-router-dom";

import initialModel from "./initialModel";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact={true} path="/" component={FinalModel} />
          <Route path="/oldModel" component={initialModel}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
