import React, { Component } from 'react';
import Navvy from '../Nav/Nav';
import GroceryInputs from '../GroceryInputs/GroceryInputs';
import './Main.css';

export default class Main extends Component {
  constructor(){
    super()
    this.getList = this.getList.bind(this);
    this.state = {
      initialized: false
    }
}

getList(){
  if (this.state.initialized) {
    this.setState({
      initialized: false
    });
  }
  fetch('/items').then((webObj)=>{
    return webObj.json();
  }).then((data)=>{
    this.items = data;
    this.setState({
      initialized: true,
    });
  })
}
componentDidMount(){
  this.getList();
}

  render(){
    if (this.state.initialized) {
  return(                                                                                   
    <div className='main'>
      <Navvy />
      <GroceryInputs className='grocery-inputs' state={this.state} items={this.items} input={this.state.input} updateInput={this.updateInput} />
    </div>
  )} else {
    return (
      <h2>
        Loading...
      </h2>
    )}
  }
}