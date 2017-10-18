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
    this.inputHouseName = this.inputHouseName.bind(this);
    this.inviteRoommates = this.inviteRoommates.bind(this);
    this.confirmPassword = this.confirmPassword.bind(this);
    this.inputpasswordChange = this.inputpasswordChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.submitCreate = this.submitCreate.bind(this);
    this.state = {
      houseName: '',
      roommates: '',
      password: '',
      confirmPassword: '',
      message: ''
    }
  }
  submitCreate(signupObj) {
    var url = '/create-house';
    fetch(url, {
        method: "POST",
        headers:{"Content-Type":"application/json"}, 
        body: JSON.stringify(
          {
            houseName: signupObj.houseName,
            password: signupObj.password
          }
        )
      }).then((response)=> { 
        return response.json();
      }).then((userObj) => { 
        if (userObj !== undefined) { 
          this.setState({
            message: userObj.message
          }); 
          this.props.history.push("/main");
        }  else {
          console.log('user add failed');
        }
    }); 
  }
  handleCreate() {
    if (this.state.password === this.state.confirmPassword) {
    this.submitCreate({
      houseName: this.state.houseName,
      password: this.state.password,
      roommates: this.state.roommates
    })
  } else {
    alert ('you fucked up')
  }}
  inputHouseName(event) {
    this.setState({houseName: event.target.value});
  }

  inputpasswordChange(event) {
    this.setState({password: event.target.value});
  }
  inviteRoommates(event) {
    this.setState({roommates: event.target.value});
  }
  confirmPassword(event) {
    this.setState({confirmPassword: event.target.value});
  }
  render(){ 
    return(
      <div>
        <h1 className="mb-3">Create List</h1>
        {this.state.message}
        <FormGroup>
          <Label for="adress">House Name</Label>{' '}
          <Input type="text" onChange={this.inputHouseName} value={this.state.adress} name="houseName" id="houseName"  placeholder="1600 Pennsylvania Ave NW"/>
        </FormGroup>
        <FormGroup>
          <Label for="password">Create Password For This List</Label>{' '}
          <Input type="password" onChange={this.inputpasswordChange} value={this.state.password} name="password" id="password"  placeholder="abc123"  />
        </FormGroup>
        <FormGroup>
          <Label for="zip">Confirm Password</Label>{' '}
          <Input type="password" onChange={this.confirmPassword} value={this.state.zip} name="confirm" id="confirm"  placeholder=""/>
        </FormGroup>
        <FormGroup>
          <Label for="state">Invite Roommates</Label>{' '}
          <Input type="text" onChange={this.inviteRoommates} value={this.state.roommates} name="state" id="state"  placeholder="Emails go here, seperated by commas..."/>
        </FormGroup>
        {' '}
        {' '}
         <Button onClick={this.handleCreate}>Submit</Button> 
      </div>
    );
  };
}

export default withRouter(House);