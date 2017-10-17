import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import './GroceryItem.css';

export default class GroceryItem extends Component {
  constructor(){
  super()
}

  render(){
  return(                                                                                   
    <ListGroupItem action>
       {this.props.items.name}
    </ListGroupItem>
  )
  }
}