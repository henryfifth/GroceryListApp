import React, { Component } from 'react';
import { Button, Col, CardSubtitle, FormGroup, Label, Input, Card, CardBody, CardTitle } from 'reactstrap';
import { CirclePicker } from 'react-color';
import { withRouter } from 'react-router-dom';
import './SignUp.css';
import 'react-color-picker/index.css'
import ReactPasswordStrength from 'react-password-strength';
var axios = require('axios');

class SignUp extends Component {
        constructor() {
          super();
          this.inputfirstNameChange = this.inputfirstNameChange.bind(this);
          this.inputlastNameChange = this.inputlastNameChange.bind(this);
          this.inputemailChange = this.inputemailChange.bind(this);
          this.handleSignup = this.handleSignup.bind(this);
          this.changeCallback = this.changeCallback.bind(this);
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
            userColor: '',
            success: false
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
        if (userObj.data.message == 'An account is already associated with that email address.') {
          this.setState({
            message: userObj.data.message
          })
        } else {
          this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            message: userObj.data.message,
            userColor: ''
          })        
          this.props.history.push("/login");
          resolve();          
        }}
    )})
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
    } else {
        this.setState({
          message: 'Passwords do not match'
        })
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
  changeCallback(event) {
      this.setState({ password: event.password });
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
    return (
      <div className="signup">
       <Col className='signup-col'></Col>   
        <Card className="signup-card">
          <CardBody>
            <CardTitle className="signup-title"> Sign Up</CardTitle>
              <FormGroup className="signup-input">
                <Label for="firstName">First Name:</Label>{' '}
                <Input type="text" onChange={this.inputfirstNameChange} value={this.state.firstName} name="firstName" id="firstName" placeholder="John" />
              </FormGroup>
              <FormGroup className="signup-input">
                <Label for="lastName">Last Name:</Label>{' '}
                <Input type="text" onChange={this.inputlastNameChange} value={this.state.lastName} name="lastName" id="lastName" placeholder="Doe" />
              </FormGroup>
              <FormGroup className="signup-input">
                <Label for="email">Email:</Label>{' '}
                <Input type="email" onChange={this.inputemailChange} value={this.state.email} name="email" id="email" placeholder="you@something.com" />
              </FormGroup>
              {' '}
              <FormGroup className="signup-input"> 
              <Label for="password">Password:</Label>{' '}
              <ReactPasswordStrength 
                value = {this.state.password}
                changeCallback={this.changeCallback}
                minLength={5}
                minScore={2}
                scoreWords={['weak', 'okay', 'good', 'strong', 'stronger']}
                inputProps={{ placeholder: "abc123", autoComplete: "off", className: "form-control" }}
              />
              </FormGroup>
              <FormGroup className="signup-input">
                <Label for="password">Confirm Password:</Label>{' '}
                <Input type="password" onChange={this.confirmPassword} value={this.state.confirmPassword} name="password" id="password" placeholder="abc123" onKeyPress={this._handleKeyPress} />
              </FormGroup>
              <Label>Select a color for this user:</Label>
              <CirclePicker className='color-picker'
              color={ this.state.userColor }
              onChangeComplete={ this.handleChangeComplete }/>
              {' '}
              <CardSubtitle style={{color:'red'}}>{this.state.message}</CardSubtitle><br/>
              <Button className="signup-button" onClick={this.handleSignup}>Submit</Button> 
         </CardBody>
         </Card>
      </div>
        );
  };
}

export default withRouter(SignUp);
