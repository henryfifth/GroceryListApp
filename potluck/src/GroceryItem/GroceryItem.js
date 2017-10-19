import React, { Component } from 'react';
import { Row, Col, Button, ListGroupItem, ListGroup } from 'reactstrap';
import './GroceryItem.css';

export default class GroceryItem extends Component {
  constructor() {
    super()
    this.selectorToggle = this.selectorToggle.bind(this);
  }


  selectorToggle(id) {
      this.props.selectorToServer(id);
  }


  render() {
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