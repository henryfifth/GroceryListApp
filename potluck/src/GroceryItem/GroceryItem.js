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
    if (this.props.item.selector) {
      return (
        <tr>
          <td><ListGroup editable={false} selectTextOnFocus={false} >
              <ListGroupItem className="list-item" style={{backgroundColor: this.props.item.color}} action onClick={() => this.selectorToggle(this.props.item._id)}>
             {this.props.item.name}
             </ListGroupItem></ListGroup></td>
          <td><ListGroup><ListGroupItem style={{backgroundColor: this.props.item.color}}>{this.props.item.quantity}</ListGroupItem></ListGroup></td>
          <td><Button class='delete' onClick={() => this.props.deleteItem(this.props.item._id)} color="danger">X</Button>
          </td>
        </tr>
    )
    }else{
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
}
