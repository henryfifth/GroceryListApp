import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';
import ListItem from '../ListItem/ListItem';
import GroceryList from '../GroceryList/GroceryList';
import Navvy from '../Nav/Nav';


export default class List extends Component {
  constructor(){
  super()
  this.updateInput = this.updateInput.bind(this);
  this.addItem = this.addItem.bind(this);
  this.state = {
    input: ""
  }
  this.itemList = []
}

  updateInput(i){
    this.setState({
      input: i.target.value
    })
  }

  addItem(){
    this.itemList.push(this.state.input);
    this.setState({
      input: ""
    })
  }

  render(){
  return(                                                                                   
    <div>
      <Navvy />
      <GroceryList itemList={this.itemList} addItem={this.addItem}/>
      <Input value={this.state.input} onChange={this.updateInput} placeholder="New item..." />
      <Button color="primary" onClick={this.addItem}>Add Item</Button>
    </div>
  )
  }
}