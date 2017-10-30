import React, { Component } from 'react';
import { Col, Button, CardSubtitle, FormGroup, Label, Input, Card, CardBody, CardTitle } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.inputemailChange = this.inputemailChange.bind(this);
    this.inputpasswordChange = this.inputpasswordChange.bind(this);
    this.testFunc = this.testFunc.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.state = {
      email: '',
      password: '',
      message: ''
    }
  }
  inputemailChange(event) {
    this.setState({ email: event.target.value });
  }
  inputpasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  testFunc(a, b) {
    this.props.submitLogin(a, b).then((user) => {
      if (user.found){
          console.log(this.props)
      this.props.history.push("/main");
      } else {
          this.setState({
            message: user.message
          })
      }
    }, (e)=>{
      console.log(e);
    });
  }

  _handleKeyPress(e) {
    if (e.key === "Enter") {
      this.testFunc(this.state.email, this.state.password);
    }
  }
  render() {
    return (
      <div className='login'>
        <Col className='space'></Col>
        <Card className='login-card'>
          <CardTitle className='login-title'>Login</CardTitle>
          <CardSubtitle style={{color: 'red'}}>{this.state.message}</CardSubtitle>
          <CardBody>
            <FormGroup className="login-input">
              <Label for="email">Email</Label>{' '}
              <Input className='login-input' type="email" onChange={this.inputemailChange} name="email" id="email" placeholder="you@something.com" />
            </FormGroup>
            {' '}
            <FormGroup className="login-input">
              <Label for="password">Password</Label>{' '}
              <Input className='login-input' type="password" onChange={this.inputpasswordChange} value={this.state.password} name="password" id="password" onKeyPress={this._handleKeyPress} />
            </FormGroup>
            {' '}
            <Button className="login-button" onClick={() => this.testFunc(this.state.email, this.state.password)} >Submit</Button>
          </CardBody>
        </Card>
      </div>
    );
  };
}

export default withRouter(Login);