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
    this.deleteItem = this.deleteItem.bind(this)    
    this.state = {
      input: "",
      items:[]
    }
}

componentDidMount(){
  this.setState({
    items:this.props.items
  });
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
  }).then((res)=>{
   return res.json();
  }).then((data)=>{
    this.setState({
      items:data
    });
  });
};

deleteItem(id){
  return fetch('/items/' + id, {
    method: 'DELETE'
  }).then((res)=>{
    return res.json();
   }).then((data)=>{
     this.setState({
       items:data
     });
   });
 };


createList(){
  this.sendData()
  this.setState({
    input: "",
  })
}

_handleKeyPress(e){
  if(e.key === "Enter"){
    this.createList();
  }
}
  render(){
    const isEnabled = this.state.input.length > 0;
  return(                                                                                   
    <div class='grocery-inputs'>
    <InputGroup class='mufu'>
      <Input value={this.state.input} onChange={this.updateInput} onKeyPress={this._handleKeyPress} placeholder="New item..."/>
      <InputGroupButton disabled={!isEnabled} color="primary" onClick={this.createList} >Add Item</InputGroupButton>
    </InputGroup>
    <GroceryList class='grocery-inputs' deleteItem={this.deleteItem} items={this.state.items} class='main'/>
    </div>
  )}
    }
