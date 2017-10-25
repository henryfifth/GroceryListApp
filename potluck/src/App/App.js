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
    constructor() {
        super();
        this.submitLogin = this.submitLogin.bind(this)
        this.logOut = this.logOut.bind(this)
        this.state = {
            email: "",
            password: "",
            message: "",
            currentUser: {
                firstName: "",
            }
        }
    }

  submitLogin(a, b) {
    return new Promise((resolve, reject)=>{
      axios.post('/login', {
            username: a,
            password: b,
    }).then((res) => {
        this.setState({
          currentUser: res.data
          });
          sessionStorage.setItem('name', this.state.currentUser.firstName);          
          resolve(res.data);
      });
    });
  }

  logOut(){
    return new Promise((resolve, reject)=>{      
    axios.get('/logout').then((res)=>{
      console.log(res)
        sessionStorage.setItem('name', "");
        resolve(res.data);      
      })
  }
)} 
  render() {
    return (
        <Router>
           <div className='bg'>
             <Route path='/' render={()=><Navvy logOut={this.logOut} currentUser={this.state.currentUser}/>} />
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
