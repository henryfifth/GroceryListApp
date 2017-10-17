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
  this._handleKeyPress = this._handleKeyPress.bind(this);
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
    if(this.state.input !== ""){
      this.itemList.push(this.state.input);
    }
    this.setState({
      input: ""
    })
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.addItem();
    }
  }

  render(){
  return(                                                                                   
    <div>
      <Navvy />
      <GroceryList itemList={this.itemList} addItem={this.addItem}/>
      <Input type="text" onKeyPress={this._handleKeyPress} value={this.state.input} onChange={this.updateInput} placeholder="New item..." />
      <Button color="primary" onClick={this.addItem}>Add Item</Button>
    </div>
  )
  }
}