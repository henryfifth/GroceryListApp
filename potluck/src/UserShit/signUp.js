import React, { Component } from 'react'; 
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {
  Redirect
} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
class SignUp extends Component{
  constructor() {
    super();
    this.inputfirstNameChange = this.inputfirstNameChange.bind(this);
    this.inputlastNameChange = this.inputlastNameChange.bind(this);
    this.inputemailChange = this.inputemailChange.bind(this);
    this.inputpasswordChange = this.inputpasswordChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      message: ''
    }
  }
  submitSignup(signupObj) {
    var url = '/signup';
   
    fetch(url, {
        method: "POST",
        headers:{"Content-Type":"application/json"}, 
        body: JSON.stringify(
          {
            firstName: signupObj.firstName,
            lastName: signupObj.lastName,
            email: signupObj.email,
            password: signupObj.password
          }
        )
      }).then((response)=> { 
        return response.json();
      }).then((userObj) => { 
        if (userObj !== undefined) { 
          this.setState({
            firstName: userObj.firstName,
            message: userObj.message,
            lastName: userObj.lastName
          }); 
          this.props.history.push("/main");
        }  else {
          console.log('user add failed');
        }
    }); 
  }
  handleSignup() {
    this.submitSignup({
      firstName: this.state.firstName,      
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    });
  }
  inputfirstNameChange(event) {
    this.setState({firstName: event.target.value});
  }
  inputlastNameChange(event) {
    this.setState({lastName: event.target.value});
  }
  inputemailChange(event) {
    this.setState({email: event.target.value});
  }
  inputpasswordChange(event) {
    this.setState({password: event.target.value});
  }
  _handleKeyPress(e){
    if(e.key === "Enter"){
      this.submitSignup();
    }
  }
  render(){ 
    return(
      <div>
        <h1 className="mb-3">Signup</h1>
        {this.state.message}
        <FormGroup>
          <Label for="firstName">First Name</Label>{' '}
          <Input type="text" onChange={this.inputfirstNameChange} value={this.state.firstName} name="firstName" id="firstName"  placeholder="John"/>
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>{' '}
          <Input type="text" onChange={this.inputlastNameChange} value={this.state.lastName} name="lastName" id="lastName"  placeholder="Doe"/>
        </FormGroup>
        <FormGroup>
        <Label for="email">Email</Label>{' '}
        <Input type="email" onChange={this.inputemailChange} value={this.state.email} name="email" id="email" placeholder="you@something.com" />
      </FormGroup>
        {' '}
        <FormGroup>
          <Label for="password">Password</Label>{' '}
          <Input type="password" onChange={this.inputpasswordChange} value={this.state.password} name="password" id="password"  placeholder="abc123"  onKeyPress={this._handleKeyPress}/>
        </FormGroup>
        {' '}
         <Button onClick={this.handleSignup}>Submit</Button> 
      </div>
    );
  };
}

export default withRouter(SignUp);