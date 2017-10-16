import React, { Component } from 'react';
import { Row } from 'reactstrap';
import GroceryItem from '../GroceryItem/GroceryItem';

export default class GroceryList extends Component {
  constructor(){
  super()
}

  render(){
    let newList = this.props.itemList.map((item, i)=>{
      return <li><GroceryItem itemList={this.props.itemList[i]}/> </li>
    })
    console.log(this.props.itemList)
  return(                                                                                   
    <div>
      <ul>
        {newList}
      </ul>
    </div>
  )
  }
}