import logo from './logo.svg';
import './App.css';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
// import { Router } from "react-router";
import { createHashHistory } from "history";
import AppIndex from "./components/AppIndex";
import Login from "./components/Login";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

// import { createHashHistory } from "his"
import * as React from "react";

// import {Bro}

const history = createHashHistory();
function App() {
  return (
    <div className="App">    
     <AppIndex />
    </div>
  );
}

export default App;
