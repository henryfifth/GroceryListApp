import React, { Component } from 'react';
import { Row, Col, Button, ListGroupItem, ListGroup } from 'reactstrap';
import './GroceryItem.css';

export default class GroceryItem extends Component {
  constructor() {
    super()
    this.selectorToggle = this.selectorToggle.bind(this);
    this.selectorToServer = this.selectorToServer.bind(this);
    this.state = {
      selector: 0
    }
  }

  selectorToServer(id) {
    fetch('/items/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        selector: this.state.selector
      })
    }).then((res) => {
      console.log(res);
      return res.json();
    }).then((data) => {
      this.setState({
        items: data
      });
    });
  }

  selectorToggle(id) {
    if (this.state.selector === 0) {
      this.setState({
        selector: this.state.selector + 1
      })
      this.selectorToServer(id);
    }
    else {
      this.setState({
        selector: this.state.selector - 1
      })
      this.selectorToServer(id);
    }
  }


  render() {
    console.log(this.props);
    return (
        <tr>
          <td><ListGroup>
              <ListGroupItem action onClick={() => this.selectorToggle(this.props.items._id)}>
             {this.props.items.name}
             </ListGroupItem></ListGroup></td>
          <td><ListGroup><ListGroupItem>{this.props.items.quantity}</ListGroupItem></ListGroup></td>
          <td><Button class='delete' onClick={() => this.props.deleteItem(this.props.items._id)} color="danger">X</Button>
          </td>
        </tr>
      
    )
  }
}