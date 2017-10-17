import React, { Component } from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import GroceryItem from '../GroceryItem/GroceryItem';
import GroceryItem2 from '../GroceryItem/GroceryItem2';

import './GroceryList.css';


export default class GroceryList extends Component {
  constructor(){
  super()
}

  render(){
    console.log(this.props)
    let newList = this.props.items.map((item, i)=>{
      return <GroceryItem class='grocery-item' items={this.props.items[i]}/>
    })
    let newList2 = this.props.itemList.map((item, i)=>{
      return <GroceryItem2 class='grocery-item' items={this.props.itemList[i]}/>
    })
  return(                                                                                   
    <div class='list-group'>
      <ListGroup >
        {newList}
        {newList2}
      </ListGroup>
    </div>
  )
  }
}