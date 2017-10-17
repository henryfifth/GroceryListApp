import React, { Component } from 'react';
import { Row, Col, Button, ListGroup, ListGroupItem } from 'reactstrap';
import './GroceryItem.css';

export default class GroceryItem extends Component {
  constructor(){
  super()
  }




  render(){
  return(  
    <ListGroupItem action ><Row>
    <Col xs="11">
       {this.props.items.name}
    </Col><Col xs="1">
       <Button class='delete' onClick={() => this.props.deleteItem(this.props.items._id)} color="danger">X</Button>
      </Col></Row>
    </ListGroupItem>
  )
  }
}