import React, { Component } from 'react';
import GroceryInputs from '../GroceryInputs/GroceryInputs';
import './Main.css';
import GroceryList from "../GroceryList/GroceryList";
var axios = require('axios');

export default class Main extends Component {
  constructor(){
    super()
    this.getList = this.getList.bind(this);
    this.sendData = this.sendData.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.selectorToServer = this.selectorToServer.bind(this);
    this.state = {
      initialized: false
    }
}

sendData(foodObj) {
  axios('/items', {
    //method: 'POST',
    //headers: { 'Content-Type': 'application/json' },
    //body: JSON.stringify({
      name: foodObj.name,
      quantity: foodObj.quantity,
    //})
  }).then((data)=>{
  //}).then((res) => {
   // return res.json();
  //}).then((data) => {
    this.setState({
      items: data
    });
  });
};

deleteItem(id) {
  return fetch('/items/' + id, {
    method: 'DELETE'
  }).then((res) => {
    console.log(res);
    return res.json();
  }).then((data) => {
    this.setState({
      items: data
    });
  });
};

selectorToServer(id, isSelected) {
  console.log(id)
  console.log(isSelected)
  fetch('/items/' + id, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    selector: isSelected
  })
}).then((res) => {
  return res.json();
}).then((data) => {
  this.setState({
    items: data
  });
});
}

getList(){
  if (this.state.initialized) {
    this.setState({
      initialized: false
    });
  }
  axios.get('/items').then((res)=>{
    this.setState({
      items:res.data,
      initialized: true,
    });
  })
}

componentDidMount(){
  this.getList();
}

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.addItem();
    }
  }

  render(){
    console.log(this.state);
    if (this.state.initialized) {
  return(
    <div className='main'>
      <GroceryInputs className='grocery-inputs' 
        sendData={this.sendData} 
       state={this.state} />
      <GroceryList 
        className='grocery-inputs' 
        selectorToServer={this.selectorToServer} 
        deleteItem={this.deleteItem} 
        items={this.state.items} 
        class='main' 
      />
    </div>
  )} else {
    return (
      <h2>
        Loading...
      </h2>
    )}
  }
}