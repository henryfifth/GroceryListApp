import React, { Component } from 'react';
import { Table } from 'reactstrap';
import GroceryItem from '../GroceryItem/GroceryItem';
import './GroceryList.css';

export default class GroceryList extends Component {
  constructor(){
    super()
    // this.sortFunc = this.sortFunc.bind(this);
    //this.selectorToServer = this.selectorToServer.bind(this);
  }

sortFunc(array){ 
  array.sort((a,b)=>{
     return (b.selector) - (a.selector);
    })
    return array;
  }  
  
  render(){
    let sortedBySelector = this.sortFunc(this.props.items)
    let newList = sortedBySelector.map((item, i)=>{
      return <GroceryItem className='grocery-item' key={i} selectorToServer={this.props.selectorToServer} deleteItem={this.props.deleteItem} item={item}/>
    })
    return(                                                                                   
    <div class='list-group'>
      <Table >
        <tbody >
        {newList}
      </tbody>   
      </Table>
    </div>
  )}}