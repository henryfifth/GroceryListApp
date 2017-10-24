import React, { Component } from 'react'; 
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';
var axios = require('axios');


class JoinHouse extends Component{
  constructor(){
    super();
    this.inputjoinHouse = this.inputjoinHouse.bind(this);
    this.inputemailChange = this.inputemailChange.bind(this);
    this.inputUser = this.inputUser.bind(this);
    this.inputpasswordChange = this.inputpasswordChange.bind(this);
    this.joint = this.joint.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.state = { 
      joinHouse: '',
      user: '',
      password: '', 
      message: ''
    }
  }

  inputjoinHouse(event) {
    this.setState({joinHouse: event.target.value});
  }

  inputUser(event) {
    this.setState({user: event.target.value});
  }

  inputemailChange(event) {
    this.setState({email: event.target.value});
  }
  inputpasswordChange(event) {
    this.setState({password: event.target.value});
  }
  joint() {
    axios.put('/join', {
            joinHouse: this.state.joinHouse,
            user: this.state.user,
            password: this.state.password
          })
    .then((userObj) => {
      if (userObj.success) { 
        this.props.history.push("/main");
      }  else {
        this.setState({message: userObj.message});
      }
    }); 
  }

_handleKeyPress(e){
  if(e.key === "Enter"){
    this.joint();
  }
}
  render(){ 
    return(
      <div>
        <h1 className="mb-3">Join a House</h1>
        {this.state.message}
        <FormGroup>
          <Label for="houseName">Enter House Name</Label>{' '}
          <Input type="text" onChange={this.inputjoinHouse} value={this.state.joinHouse} name="houseName" id="houseName" onKeyPress={this._handleKeyPress}  />
        </FormGroup>
        {' '}
        <FormGroup>
          <Label for="houseName">Enter Email</Label>{' '}
          <Input type="text" onChange={this.inputUser} value={this.state.user} name="houseName" id="houseName" onKeyPress={this._handleKeyPress}  />
        </FormGroup>
        {' '}
        <FormGroup>
          <Label for="password">Password</Label>{' '}
          <Input type="password" onChange={this.inputpasswordChange} value={this.state.password} name="password" id="password" onKeyPress={this._handleKeyPress}  />
        </FormGroup>
        {' '}
        <Button onClick={this.joint} >Submit</Button>
    
      </div>
    );
  };
}

export default withRouter(JoinHouse);