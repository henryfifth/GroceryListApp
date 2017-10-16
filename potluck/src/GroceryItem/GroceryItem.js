import React, { Component } from 'react';

export default class GroceryItem extends Component {
  constructor(){
  super()
}

  render(){
    console.log(this.props);
  return(                                                                                   
    <div>
       {this.props.itemList}
    </div>
  )
  }
}