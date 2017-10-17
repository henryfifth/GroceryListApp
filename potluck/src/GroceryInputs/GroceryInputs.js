import React, { Component } from 'react';
import { Button, Input, InputGroup, InputGroupButton } from 'reactstrap';
import './GroceryInputs.css';

export default class List extends Component {
  constructor(){
  super()
}

  render(){
    console.log(this.props)
  return(                                                                                   
    <div class='grocery-inputs'>
    <InputGroup>
      <Input value={this.props.input} onChange={this.props.updateInput} placeholder="New item..."/>
      <InputGroupButton color="primary" onClick={this.props.addItem}>To the Right!</InputGroupButton>
    </InputGroup>
    </div>
  )}
}


