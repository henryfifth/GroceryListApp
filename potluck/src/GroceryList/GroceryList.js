import React, { Component } from 'react';
import { ListGroup } from 'reactstrap';
import GroceryItem from '../GroceryItem/GroceryItem';
import './GroceryList.css';

export default class GroceryList extends Component {

  render(){
    console.log(this.props);
    let newList = this.props.items.map((item, i)=>{
      return <GroceryItem class='grocery-item' deleteItem={this.props.deleteItem} items={this.props.items[i]}/>
    })

  return(                                                                                   
    <div class='list-group'>
      <ListGroup >
        {newList}
      </ListGroup>
    </div>
  )
  }
}