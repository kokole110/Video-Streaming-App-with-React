import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from "./header.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainContainer from './pages/mainContainer.js';
import SignUp from './pages/signup.js';
// import Account from './pages/account.js';
import Login from './pages/login.js';
import Shows from './pages/shows.js'

function App() {
  return (
    <Router>
      <Header />
      
      <Switch>
        <Route exact path="/" component = {MainContainer} />
        <Route exact path="/login" component = {Login} />
        <Route exact path="/shows" component = {Shows} />
        <Route exact path="/signup" component = {SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
