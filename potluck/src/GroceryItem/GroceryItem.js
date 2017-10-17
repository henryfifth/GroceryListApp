import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import './GroceryItem.css';

export default class GroceryItem extends Component {
  constructor(){
  super()
}

  render(){
    console.log(this.props);
  return(                                                                                   
    <ListGroupItem action>
       {this.props.itemList}
    </ListGroupItem>
  )
  }
}