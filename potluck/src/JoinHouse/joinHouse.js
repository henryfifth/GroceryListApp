import React, { Component } from 'react'; 
import { Button, FormGroup, Label, Input, Card, CardTitle, CardBody, CardSubtitle, CardText, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import './joinHouse.css';
var axios = require('axios');


class JoinHouse extends Component{
  constructor(){
    super();
    this.inputjoinHouse = this.inputjoinHouse.bind(this);
    this.inputemailChange = this.inputemailChange.bind(this);
    this.inputpasswordChange = this.inputpasswordChange.bind(this);
    this.joint = this.joint.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.state = { 
      joinHouse: '',
      password: '', 
      message: ''
    }
  }

  inputjoinHouse(event) {
    this.setState({joinHouse: event.target.value});
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
            password: this.state.password
          })
    .then((userObj) => {
      console.log(userObj);
      console.log(this.state);
      if (userObj.data.message === "House Does Not Match") {
        this.setState({
          message: userObj.data.message
        })  
      }  else {
        
        this.setState({
          message: userObj.data.message,
          joinHouse: '',
          password: '',
  

        });
        this.props.history.push("/main");
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
      <div className='joinhouse'>

        <Col className='join-col'></Col>
        {this.state.message}
        <Card className='joinhouse-card'>
          <CardBody>
          <CardTitle className='joinhouse-title'> Join a House List </CardTitle>{' '}
          <CardSubtitle> {this.state.message} </CardSubtitle>{' '}
          <CardText>Enter your house name, username, and password to begin adding to your shared grocery list </CardText>{' '}
        <FormGroup className='joinhouse-input'>
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

        <Button className='joinhouse-button' onClick={this.joinIt} >Submit</Button>
    </CardBody>
    </Card>
      </div>
    );
  };
}

export default withRouter(JoinHouse);