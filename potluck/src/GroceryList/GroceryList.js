import React, { Component } from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import GroceryItem from '../GroceryItem/GroceryItem';
import './GroceryList.css';


export default class GroceryList extends Component {
  constructor(){
  super()
}

  render(){
    let newList = this.props.itemList.map((item, i)=>{
      return <GroceryItem class='grocery-item' itemList={this.props.itemList[i]}/>
    })
    console.log(this.props.itemList)
  return(                                                                                   
    <div class='list-group'>
      <ListGroup >
        {newList}
      </ListGroup>
    </div>
  )
  }
}