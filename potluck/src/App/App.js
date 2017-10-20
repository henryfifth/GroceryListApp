import React, { Component } from 'react';
import './App.css';
import Main from '../Main/Main';
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import Navvy from "../Nav/Nav.js";
import House from "../CreateHouse/CreateHouse.js";
import JoinHouse from "../JoinHouse/JoinHouse.js";

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
     
        <Router>
           <div>
             <Route path='/' render={()=><Navvy/>} />
             <Route path='/Login' render={() => <Login/>}/>
             <Route path='/Signup' render={()=> <SignUp/>}/> 
             <Route path='/Main' render={()=> <Main/>}/>
             <Route path='/House' render={()=> <House/>}/>
             <Route path='/Join-House' render={()=> <JoinHouse />}/>
          </div>
        </Router>
      
    )}
}

export default App;
