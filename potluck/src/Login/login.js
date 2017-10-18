import React, { Component } from 'react'; 
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class Login extends Component{
  constructor(){
    super();
    this.inputemailChange = this.inputemailChange.bind(this);
    this.inputpasswordChange = this.inputpasswordChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.state = { 
      email: '',
      password: '', 
      message: ''
    }
  }
  inputemailChange(event) {
    this.setState({email: event.target.value});
  }
  inputpasswordChange(event) {
    this.setState({password: event.target.value});
  }
  submitLogin() {
    var url = '/login';
    fetch(url, {                      
        method: "POST",
        headers:{"Content-Type":"application/json"}, 
        body: JSON.stringify(
          {
            email: this.state.email,
            password: this.state.password
          }
        )
      }).then(function (response) { 
        return response.json();
    }).then((userObj) => {
      if (userObj.success) { 
        this.props.history.push("/main");
      }  else {
        this.setState({message: userObj.message});
      }
    }); 
  }

_handleKeyPress(e){
  if(e.key === "Enter"){
    this.submitLogin();
  }
}
  render(){ 
    return(
      <div>
        <h1 className="mb-3">Login</h1>
        {this.state.message}
        <FormGroup>
        <Label for="email">Email</Label>{' '}
        <Input type="email" onChange={this.inputemailChange} name="email" id="email" placeholder="you@something.com" />
      </FormGroup>
        {' '}
        <FormGroup>
          <Label for="password">Password</Label>{' '}
          <Input type="password" onChange={this.inputpasswordChange} value={this.state.password} name="password" id="password" onKeyPress={this._handleKeyPress}  />
        </FormGroup>
        {' '}
        <Button onClick={this.submitLogin} >Submit</Button>
    
      </div>
    );
  };
}

export default withRouter(Login);