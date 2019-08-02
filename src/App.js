import React from 'react';

import {BrowserRouter, Route} from 'react-router-dom';

import 'materialize-css/dist/css/materialize.min.css'
import '../node_modules/materialize-css/dist/js/materialize.min.js'
import axios from 'axios'

import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';

axios.defaults.baseURL = 'https://ndb99xkpdk.execute-api.eu-west-2.amazonaws.com/dev'

function App() {
  return (
    <BrowserRouter>
      <h1>
        React Hooks Tutorial
      </h1>
      <Navbar/>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/about" component={About}></Route>
    </BrowserRouter>
  );
}

export default App;
