import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class GroceryItem2 extends Component {
  constructor(){
  super()
}

  render(){
    console.log(this.props);
  return(                                                                                   
    <ListGroupItem action>
       {this.props.items}
    </ListGroupItem>
  )
  }
}