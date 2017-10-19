import React, { Component } from 'react';
import GroceryList from '../GroceryList/GroceryList';
import { Input, InputGroup, InputGroupButton } from 'reactstrap';
import './GroceryInputs.css';

export default class List extends Component {
  constructor() {
    super()
    this.createList = this.createList.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.state = {
      input: "",
      quantity: "",
      items: []
    }
  }

  componentDidMount() {
    this.setState({
      items: this.props.items
    });
  }

  updateInput(i) {
    this.setState({
      input: i.target.value
    })
  }

  updateQuantity(q) {
    this.setState({
      quantity: q.target.value
    })
  }

  createList() {
    this.props.sendData({
      name:this.state.input,
      quantity:this.state.quantity
    });
    
    this.setState({
      input: "",
      quantity: "",
    })
  }

  _handleKeyPress(e) {
    if (e.key === "Enter") {
      this.createList();
    }
  }
  render() {
    const isEnabled = this.state.input.length > 0;
    return (
      <div className='grocery-inputs'>
        <InputGroup className='mufu'>
          <Input value={this.state.input} onChange={this.updateInput} onKeyPress={this._handleKeyPress} placeholder="New item..." />
          <Input type='number' value={this.state.quantity} onChange={this.updateQuantity} onKeyPress={this._handleKeyPress} placeholder="Quantity..." />
          <InputGroupButton disabled={!isEnabled} color="primary" onClick={this.createList} >Add Item</InputGroupButton>
        </InputGroup>
      </div>
    )
  }
}
