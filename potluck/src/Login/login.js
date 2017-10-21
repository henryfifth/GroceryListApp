import React, { Component } from 'react'; 
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import './Login.css';

class Login extends Component{
  constructor(){
    super();
    this.inputemailChange = this.inputemailChange.bind(this);
    this.inputpasswordChange = this.inputpasswordChange.bind(this);
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


_handleKeyPress(e){
  if(e.key === "Enter"){
    this.submitLogin();
  }
}
  render(){ 
    console.log(this.state);
    return(
      <div className='login'>
        <h1 className="mb-3">Login</h1>
        {this.state.message}
        <FormGroup>
        <Label for="email">Email</Label>{' '}
        <Input className='login-input' type="email" onChange={this.inputemailChange} name="email" id="email" placeholder="you@something.com" />
      </FormGroup>
        {' '}
        <FormGroup>
          <Label for="password">Password</Label>{' '}
          <Input className='login-input' type="password" onChange={this.inputpasswordChange} value={this.state.password} name="password" id="password" onKeyPress={this._handleKeyPress}  />
        </FormGroup>
        {' '}
        <Button className="login-button" onClick={this.props.submitLogin} >Submit</Button>
    
      </div>
    );
  };
}

export default withRouter(Login);