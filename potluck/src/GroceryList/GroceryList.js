import React, { Component } from 'react';
import { Table, ListGroup } from 'reactstrap';
import GroceryItem from '../GroceryItem/GroceryItem';
import './GroceryList.css';

export default class GroceryList extends Component {
  constructor(){
    super();
    this.selectorToServer = this.selectorToServer.bind(this);
    this.state = {
      selector: 0
    }
  }
 
  selectorToServer(id) {
    fetch('/items/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        selector: this.state.selector
      })
    }).then((res) => {
      console.log(res);
      return res.json();
    }).then((data) => {
      this.setState({
        selector: data.selector
      });
    });
  }

  render(){
    console.log("HERE")
    console.log(this.state.selector);
    let newList = this.props.items.map((item, i)=>{
      return <GroceryItem class='grocery-item' deleteItem={this.props.deleteItem} items={this.props.items[i]} selectorToServer={this.selectorToServer}/>
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