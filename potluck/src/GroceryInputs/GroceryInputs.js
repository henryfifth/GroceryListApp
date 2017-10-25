import React, { Component } from 'react';
import { Input, InputGroup, InputGroupButton, Col } from 'reactstrap';
import './groceryInputs.css';

export default class List extends Component {
  constructor() {
    super()
    this.addToList = this.addToList.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.state = {
      input: "",
      quantity: "",
      items: []
    }
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

  addToList() {
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
      this.addToList();
    }
  }
  render() {
    const isEnabled = this.state.input.length > 0
    return (
      <div className='grocery-inputs'>
        <Col className='input-col'></Col>
        <InputGroup>
          <Input value={this.state.input} onChange={this.updateInput} onKeyPress={this._handleKeyPress} placeholder="New item..." />
          <Input type='number' value={this.state.quantity} onChange={this.updateQuantity} onKeyPress={this._handleKeyPress} placeholder="Quantity..." />
          <InputGroupButton disabled={!isEnabled} color="primary" onClick={this.addToList} >Add Item</InputGroupButton>
        </InputGroup>
      </div>
      )
    }
  }
