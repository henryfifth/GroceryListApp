import React, { Component } from 'react';
import GroceryInputs from '../GroceryInputs/GroceryInputs';
import './Main.css';
import { Card, CardTitle } from 'reactstrap';
import GroceryList from "../GroceryList/GroceryList";
var axios = require('axios');

export default class Main extends Component {
  constructor(){
    super()
    this.getList = this.getList.bind(this);
    this.sendData = this.sendData.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.selectorToServer = this.selectorToServer.bind(this);
    this.getUser = this.getUser.bind(this);
    this.state = {
      initialized: false
    }
}

sendData(foodObj) {
  axios.post('/items', {
      name: foodObj.name,
      quantity: foodObj.quantity,
  }).then((data)=>{
    this.setState({
      items: data.data
    });
  });
};

getUser() {
  axios.get('/user').then((res)=>{
    console.log(res.data);
  })
  }


deleteItem(id) {
  axios.delete('/items/' + id)
  .then((data) => {
    console.log(data)
    this.setState({
      items: data.data
    });
  });
};

selectorToServer(id, toggleValue) {
  axios.put('/items/' + id, {selector: toggleValue}, {headers: { 'Content-Type': 'application/json' }}
).then((data) => {
  this.setState({
    items: data.data
  });
});
}

getList(){
  if (this.state.initialized) {
    this.setState({
      initialized: false
    });
  }
  axios.get('/items')
  .then((data)=>{
    this.setState({
      items:data.data,
      initialized: true,
    });
  })
}

componentDidMount(){
  this.getList();
  this.getUser();
}

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.addItem();
    }
  }

  render(){
    console.log(this.state)
    if (this.state.initialized === false) {
      return (
        <div className='main'>
        <h2>
          Loading...
        </h2>
        </div>
      )}

    else {
  return(
    <div className='main'>
      <GroceryInputs className='grocery-inputs' 
        sendData={this.sendData} 
        items={this.state.items}
        state={this.state} />
      <GroceryList 
        className='grocery-inputs' 
        selectorToServer={this.selectorToServer} 
        deleteItem={this.deleteItem} 
        items={this.state.items} 
        class='main' 
      />
    </div>
  )} 
  }
}