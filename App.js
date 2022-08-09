import React, { Component } from "react";

import ParentComp from "./Parent";
import UserComp from "./Users";
import Users from "./project/Users";
import Parent from "./func comp/Parent";
//import Users from "./yoyo/Users";
// import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return <Users />
   
    
  }
}

export default App;
