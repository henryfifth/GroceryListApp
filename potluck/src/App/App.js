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
var axios = require('axios');


class App extends Component {
constructor(){
  super();
  this.submitLogin = this.submitLogin.bind(this)
  this.state = { 
    email: "",
    password: "",
    message:"",
  }
}

  submitLogin() {
    var url = '/login';
      axios.post(url, {
            username: this.state.email,
            password: this.state.password,
    }).then((userObj) => {
      console.log(userObj);
      if (userObj.data.success) { 
        this.props.history.push("/main");
      }  else {
        this.setState({message: userObj.data.message});
      }
    }); 
  }
  
  render() {
    return (
     
        <Router>
           <div>
             <Route path='/' render={()=><Navvy/>} />
             <Route path='/Login' render={() => <Login submitLogin={this.submitLogin} />}/>
             <Route path='/Signup' render={()=> <SignUp/>}/> 
             <Route path='/Main' render={()=> <Main/>}/>
             <Route path='/House' render={()=> <House/>}/>
             <Route path='/Join-House' render={()=> <JoinHouse />}/>
          </div>
        </Router>
      
    )}
}

export default App;
