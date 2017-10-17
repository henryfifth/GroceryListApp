import React, { Component } from 'react';
import './App.css';
import Main from '../Main/Main';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
     
        <Router>
           <div>
             {/* <Route path='/Login' render={() => <Login/>}/>
             <Route path='/Signup' render={()=> <SignUp/>}/> */}
             <Route path='' render={()=> <Main/>}/>
          </div>
        </Router>
      
    )}
}

export default App;
