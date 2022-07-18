import {Switch, Route} from "react-router-dom" // version 5
import {useState, useEffect} from "react"

import UserPage from "./UserPage"
import Component from "./Component";

function App() {
  return (
    <div>
      <UserPage/>
      <Component/>
    </div>
  );
}

export default App;
