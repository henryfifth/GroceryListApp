import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Card, CardBody, CardTitle } from 'reactstrap';
import { CirclePicker } from 'react-color';
import { render } from 'react-dom'
import { withRouter } from 'react-router-dom';
import './signUp.css';
import 'react-color-picker/index.css'
var axios = require('axios');



class SignUp extends Component {
  constructor() {
    super();
    this.inputfirstNameChange = this.inputfirstNameChange.bind(this);
    this.inputlastNameChange = this.inputlastNameChange.bind(this);
    this.inputemailChange = this.inputemailChange.bind(this);
    this.inputpasswordChange = this.inputpasswordChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.confirmPassword = this.confirmPassword.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      message: '',
      userColor: ''
    }
  }

  handleChangeComplete = (color) => {
    this.setState({ userColor: color.hex });
  };

  submitSignup(signupObj) {
    return new Promise((resolve, reject) => {
      axios.post('/signup', {
        firstName: signupObj.firstName,
        lastName: signupObj.lastName,
        email: signupObj.email,
        password: signupObj.password,
        color: signupObj.color

      }
      ).then((userObj) => {
        if (userObj !== undefined) {
          this.setState({
            firstName: userObj.firstName,
            message: userObj.message,
            lastName: userObj.lastName
          })
          resolve();
        } else {
          console.log('Undefined');
        }
      });
    })
  }

  handleSignup() {
    if (this.state.password === this.state.confirmPassword) {
      this.submitSignup({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        color: this.state.userColor
      })
      this.props.history.push("/login");
    } else {
      alert('Passwords Do Not Match')
    }
  }
  inputfirstNameChange(event) {
    this.setState({ firstName: event.target.value });
  }
  inputlastNameChange(event) {
    this.setState({ lastName: event.target.value });
  }
  inputemailChange(event) {
    this.setState({ email: event.target.value });
  }
  inputpasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  confirmPassword(event) {
    this.setState({ confirmPassword: event.target.value });
  }

  _handleKeyPress(e) {
    if (e.key === "Enter") {
      this.handleSignup();
    }
  }
  render() {
    console.log(this.state.userColor)
    return (
      <div className="signup">
        {this.state.message}
        <Card className="signup-card">
          <CardBody>
            <CardTitle className="signup-title"> Sign Up </CardTitle>
              <FormGroup className="signup-input">
                <Label for="firstName">First Name</Label>{' '}
                <Input type="text" onChange={this.inputfirstNameChange} value={this.state.firstName} name="firstName" id="firstName" placeholder="John" />
              </FormGroup>
              <FormGroup className="signup-input">
                <Label for="lastName">Last Name</Label>{' '}
                <Input type="text" onChange={this.inputlastNameChange} value={this.state.lastName} name="lastName" id="lastName" placeholder="Doe" />
              </FormGroup>
              <FormGroup className="signup-input">
                <Label for="email">Email</Label>{' '}
                <Input type="email" onChange={this.inputemailChange} value={this.state.email} name="email" id="email" placeholder="you@something.com" />
              </FormGroup>
              {' '}
              <FormGroup className="signup-input">
                <Label for="password">Password</Label>{' '}
                <Input type="password" onChange={this.inputpasswordChange} value={this.state.password} name="password" id="password" placeholder="abc123" onKeyPress={this._handleKeyPress} />
              </FormGroup>
              <FormGroup className="signup-input">
                <Label for="password">Confirm Password</Label>{' '}
                <Input type="password" onChange={this.confirmPassword} value={this.state.confirmPassword} name="password" id="password" placeholder="abc123" onKeyPress={this._handleKeyPress} />
              </FormGroup>
              <CirclePicker 
              color={ this.state.userColor }
              onChangeComplete={ this.handleChangeComplete }/>
              {' '}
              <Button className="signup-button" onClick={this.handleSignup}>Submit</Button> 
         </CardBody>
         </Card>
      </div>
        );
  };
}

export default withRouter(SignUp);