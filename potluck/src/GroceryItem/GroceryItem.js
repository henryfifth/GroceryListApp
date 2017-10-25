import React, { Component } from 'react';
import { Button, ListGroupItem, ListGroup } from 'reactstrap';
import './GroceryItem.css';

export default class GroceryItem extends Component {
  constructor() {
    super()
    this.selectorToggle = this.selectorToggle.bind(this);
  }


  selectorToggle(id) {
    let toggleValue = !this.props.item.selector;
    this.props.selectorToServer(id, toggleValue);
  }

  render() { 
    if (this.props.item.selector === true) {
      return (
        <tr>
          <td><ListGroup>
              <ListGroupItem className='color' action onClick={() => this.selectorToggle(this.props.item._id)}>
             {this.props.item.name}
             </ListGroupItem></ListGroup></td>
          <td><ListGroup><ListGroupItem className='color'>{this.props.item.quantity}</ListGroupItem></ListGroup></td>
          <td><Button class='delete' onClick={() => this.props.deleteItem(this.props.item._id)} color="danger">X</Button>
          </td>
        </tr>
      
    )
    }
      return (
        <tr>
          <td><ListGroup>
              <ListGroupItem action onClick={() => this.selectorToggle(this.props.item._id)}>
             {this.props.item.name}
             </ListGroupItem></ListGroup></td>
          <td><ListGroup><ListGroupItem>{this.props.item.quantity}</ListGroupItem></ListGroup></td>
          {/* WHY does class='delete' work, but className='delete' (proper syntax) does not work?!?!?! */}
          <td><Button class='delete' onClick={() => this.props.deleteItem(this.props.item._id)} color="danger">X</Button>
          </td>
        </tr>
    )
    }
  }
