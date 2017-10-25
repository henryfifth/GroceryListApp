import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Card, CardTitle, CardSubtitle, CardBody, CardText, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import './createHouse.css';
var axios = require('axios');

class House extends Component {
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
    axios.post('/create-house', { 
      houseName: signupObj.houseName,
      password: signupObj.password,
      roommates: signupObj.roommates
    }
    ).then((userObj) => {
      console.log(userObj);
      if (userObj !== undefined) {
        this.setState({
          message: userObj.data.message
        });
      } else {
        console.log('New List Failed');
      }
    });
  };
  handleCreate() {
    if (this.state.password === this.state.confirmPassword) {
      this.submitCreate({
        houseName: this.state.houseName,
        password: this.state.password,
        roommates: this.state.roommates
      })
      this.setState({
        houseName: "",
        password: "",
        roommates: "",
        confirmPassword: ''
      })
      this.props.history.push("/join-house");

    } else {
      this.setState({
        message: "Passwords Don't Match",
        houseName: '',
        password: '',
        roommates: '',
        confirmPassword: '' 
      })
    } 

  }
  inputHouseName(event) {
    this.setState({ houseName: event.target.value });
  }

  inputpasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  inviteRoommates(event) {
    this.setState({ roommates: event.target.value });
  }
  confirmPassword(event) {
    this.setState({ confirmPassword: event.target.value });
  }
  render() {
    console.log(this.state);
    const isEnabled = this.state.password.length > 0;
    return (
      <div className="createhouse">
        <Col className='create-col'></Col>
        <Card className='createhouse-card'>
          <CardBody>
            <CardTitle className="createhouse-title">Create House List </CardTitle>{' '}
            <CardSubtitle style={{color:'red'}}>{this.state.message}</CardSubtitle>{' '}
            <CardText>Create a house for you and your roommates and begin a shared grocery list! Already received an invite? Click the Join House link on the navbar.</CardText>{' '}
            <FormGroup className='createhouse-input'>
              <Label for="adress">House Name</Label>{' '}
              <Input type="text" onChange={this.inputHouseName} value={this.state.houseName} name="houseName" id="houseName" placeholder="1600 Pennsylvania Ave NW" />
            </FormGroup>
            <FormGroup className='createhouse-input'>
              <Label for="password">Create Password For This List</Label>{' '}
              <Input type="password" onChange={this.inputpasswordChange} value={this.state.password} name="password" id="password" placeholder="abc123" />
            </FormGroup>
            <FormGroup className='createhouse-input'>
              <Label for="zip">Confirm Password</Label>{' '}
              <Input type="password" onChange={this.confirmPassword} value={this.state.confirmPassword} name="confirm" id="confirm" placeholder="" />
            </FormGroup>
            <FormGroup className='createhouse-input'>
              <Label for="state">Invite Roommates</Label>{' '}
              <Input type="text" onChange={this.inviteRoommates} value={this.state.roommates} name="state" id="state" placeholder="Emails go here, seperated by commas..." />
            </FormGroup>
            {' '}
            {' '}
            <Button disabled={!isEnabled} className='createhouse-button' onClick={this.handleCreate}>Submit</Button>
          </CardBody>
        </Card>
      </div>
    );
  };
}

export default withRouter(House);