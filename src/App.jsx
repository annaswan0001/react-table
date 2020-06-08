import React from "react";
import "./App.css";
import ReactTableBasic from "./ReactTable/ReactTableBasic";
import BootstrapTableContainer from "./BootstrapTable/BootstrapTableContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

function App() {

  return (
    <Router>
      <NavLink to="/react-table">REACT_TABLE</NavLink>
      <p></p>
      <NavLink to="/bootstrap-table">BOOTSTRAP_TABLE</NavLink>
      <Switch>
        <Route exact path="/react-table">
          <ReactTableBasic /> 
        </Route>
        <Route exact path="/bootstrap-table">
          <BootstrapTableContainer/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
