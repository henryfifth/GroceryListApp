import React, { Component } from 'react';
import GroceryList from '../GroceryList/GroceryList';
import { Button, Input, InputGroup, InputGroupButton } from 'reactstrap';
import './GroceryInputs.css';


export default class List extends Component {
  constructor(){
  super()
  this.createList = this.createList.bind(this);
  this.updateInput = this.updateInput.bind(this);
  this._handleKeyPress = this._handleKeyPress.bind(this);
  this.state = {
    input: "",
    update: true,
  }
}

updateInput(i){
  this.setState({
    input: i.target.value
  })
}

sendData(){
  fetch('/items',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: this.state.input, 
    })
  });
  fetch('/items').then((webObj)=>{
    return webObj.json();
  }).then((data)=>{
    this.items = data;
  })
};

createList(){
  if (this.state.update){
    this.setState({
      update: false
    })
  }
  this.props.itemList.push(this.state.input);
  this.sendData()
  this.setState({
    input: "",
    update: true
  })
}

_handleKeyPress(e){
  if(e.key === "Enter"){
    this.createList();
  }
}
  render(){
    console.log(this);
    const isEnabled = this.state.input.length > 0;
    if (this.state.update){
  return(                                                                                   
    <div class='grocery-inputs'>
    <InputGroup>
      <Input value={this.state.input} onChange={this.updateInput} onKeyPress={this._handleKeyPress} placeholder="New item..."/>
      <InputGroupButton disabled={!isEnabled} color="primary" onClick={this.createList} >Add Item</InputGroupButton>
    </InputGroup>
    <GroceryList class='grocery-inputs' items={this.props.items} itemList={this.props.itemList} class='main'/>
    </div>
  )} else {
      return (
        <h2>
          Loading...
        </h2>
      )};
    }
  }