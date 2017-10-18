/**
 * TODO
 * Make "Create House" page only available when logged in.
 * Figure out how to add users to house or vice versa
 * Add all the shit
 * Make it look pretty
 */

import React, { Component } from 'react'; 
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {
  Redirect
} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
class House extends Component{
  constructor() {
    super();
    this.inputadressChange = this.inputadressChange.bind(this);
    this.inputcityChange = this.inputcityChange.bind(this);
    this.inputstateChange = this.inputstateChange.bind(this);
    this.inputzipChange = this.inputzipChange.bind(this);
    this.inputpasswordChange = this.inputpasswordChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
    this.state = {
      adress: '',
      city: '',
      state: '',
      password: '',
      zip: "",
      message: ''
    }
  }
  submitSignup(signupObj) {
    var url = '/create-house';
   
    fetch(url, {
        method: "POST",
        headers:{"Content-Type":"application/json"}, 
        body: JSON.stringify(
          {
            adress: signupObj.adress,
            city: signupObj.city,
            state: signupObj.state,
            zip: signupObj.zip,
            password: signupObj.password
          }
        )
      }).then((response)=> { 
        return response.json();
      }).then((userObj) => { 
        if (userObj !== undefined) { 
          this.setState({
            adress: userObj.adress,
            message: userObj.message,
            city: userObj.city
          }); 
          this.props.history.push("/main");
        }  else {
          console.log('user add failed');
        }
    }); 
  }
  handleSignup() {
    this.submitSignup({
      adress: this.state.adress,
      password: this.state.password,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip
    });
  }
  inputadressChange(event) {
    this.setState({adress: event.target.value});
  }
  inputcityChange(event) {
    this.setState({city: event.target.value});
  }
  inputpasswordChange(event) {
    this.setState({password: event.target.value});
  }
  inputstateChange(event) {
    this.setState({state: event.target.value});
  }
  inputzipChange(event) {
    this.setState({zip: event.target.value});
  }
  render(){ 
    return(
      <div>
        <h1 className="mb-3">Create House</h1>
        {this.state.message}
        <FormGroup>
          <Label for="adress">Address</Label>{' '}
          <Input type="text" onChange={this.inputadressChange} value={this.state.adress} name="adress" id="adress"  placeholder="1600 Pennsylvania Ave NW"/>
        </FormGroup>
        <FormGroup>
          <Label for="City">City</Label>{' '}
          <Input type="text" onChange={this.inputcityChange} value={this.state.city} name="city" id="city"  placeholder="Washington"/>
        </FormGroup>
        <FormGroup>
          <Label for="state">State</Label>{' '}
          <Input type="text" onChange={this.inputstateChange} value={this.state.state} name="state" id="state"  placeholder="DC"/>
        </FormGroup>
        <FormGroup>
          <Label for="zip">Zip Code</Label>{' '}
          <Input type="text" onChange={this.inputzipChange} value={this.state.zip} name="zip" id="zip"  placeholder="20500"/>
        </FormGroup>
        {' '}
        <FormGroup>
          <Label for="password">Password</Label>{' '}
          <Input type="password" onChange={this.inputpasswordChange} value={this.state.password} name="password" id="password"  placeholder="abc123"  />
        </FormGroup>
        {' '}
         <Button onClick={this.handleSignup}>Submit</Button> 
      </div>
    );
  };
}

export default withRouter(House);