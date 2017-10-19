import React, { Component } from 'react';
import { Table, ListGroup } from 'reactstrap';
import GroceryItem from '../GroceryItem/GroceryItem';
import './GroceryList.css';

export default class GroceryList extends Component {
  constructor(){
    super()
    
  }
 
  render(){
    let newList = this.props.items.map((item, i)=>{
      return <GroceryItem class='grocery-item' deleteItem={this.props.deleteItem} items={this.props.items[i]}/>
    })
    console.log(newList)
  return(                                                                                   
    <div class='list-group'>
      <Table >
        <tbody >
        {newList}
      </tbody>   
      </Table>
    </div>
  )
  }
}