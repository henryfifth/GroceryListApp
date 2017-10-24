import React, { Component } from 'react';
import './App.css';
import Main from '../Main/Main';
import SignUp from "../SignUp/signUp";
import Login from "../Login/login";
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
        return new Promise((resolve, reject) => {
            var url = '/login';
            axios.post(url, {
                username: a,
                password: b,
            }).then((userObj) => {
                //console.log(userObj.data.firstName)
                this.setState({
                    currentUser: {
                        firstName: userObj.data.firstName
                    }
                });
                resolve();
            });
        });
    }
  submitLogin(a, b) {
    return new Promise((resolve, reject)=>{
    var url = '/login';
      axios.post(url, {
            username: a,
            password: b,
    }).then((res) => {
        this.setState({
          currentUser: res.data
          });
          resolve(res.data);
      });
    });
  }
  
  render() {
    return (
        <Router>
           <div className='bg'>
             <Route path='/' render={()=><Navvy currentUser={this.state.currentUser}/>} />
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
