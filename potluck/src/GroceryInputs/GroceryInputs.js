import React, { Component } from 'react';
import GroceryList from '../GroceryList/GroceryList';
import { Button, Input, InputGroup, InputGroupButton } from 'reactstrap';
import './GroceryInputs.css';

export default class List extends Component {
  constructor(){
  super()
}

  render(){
    const isEnabled = this.props.input.length > 0;
    console.log(this.props)
  return(                                                                                   
    <div class='grocery-inputs'>
    <InputGroup>
      <Input value={this.props.input} onChange={this.props.updateInput} placeholder="New item..."/>
      <InputGroupButton disabled={!isEnabled} color="primary" onClick={this.props.addItem}>Add Item</InputGroupButton>
    </InputGroup>
    <GroceryList class='grocery-inputs' itemList={this.props.itemList} addItem={this.props.addItem} class='main'/>
    </div>
  )}
}


