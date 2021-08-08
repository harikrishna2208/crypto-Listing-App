import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import View from "./Components/View/View";
import Home from "./Components/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route path="/Home">
          <Home />
        </Route>
        <Route path="/View">
          <View />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
