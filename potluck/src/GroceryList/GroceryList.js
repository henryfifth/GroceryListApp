import React, { Component } from 'react';
import { Table } from 'reactstrap';
import GroceryItem from '../GroceryItem/GroceryItem';
import './GroceryList.css';
import {withRouter} from "react-router-dom";

class GroceryList extends Component {
    constructor(){
        super();
        this.sortFunc = this.sortFunc.bind(this);
    }
    sortFunc(array){
        array.sort((a,b)=>{
            return (b.selector) - (a.selector);
        })
        return array;
    }  

<<<<<<< HEAD
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
      <Table>
        <tbody >
        {newList}
      </tbody>   
      </Table>
    </div>
  )}}
=======
    render(){
        let sortedBySelector = this.sortFunc(this.props.items);
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
        )
    }
}
>>>>>>> b6df6b949f6aeb768cc39b3ae45d161c81654f3e

export default withRouter(GroceryList);