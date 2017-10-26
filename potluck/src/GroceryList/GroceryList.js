import React, { Component } from 'react';
import { Table } from 'reactstrap';
import GroceryItem from '../GroceryItem/GroceryItem';
import './GroceryList.css';
import {withRouter} from "react-router-dom";
import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:5000');

class GroceryList extends Component {
    //begin socket stuff
    constructor(props) {
        super(props);
        //couldn't think of a short & non-confusing name
        this.functionThatGetsList((err, list) => this.setState({ 
            list
        }));
    }

    functionThatGetsList(cb) {
        socket.on('list', list => cb(null, list));
        socket.emit('functionThatGetsList', 1000);
    }

    state = {
        list: 'no list yet'
    };
    //end socket stuff
    sortFunc(array){ 
        array.sort((a,b)=>{
            return (b.selector) - (a.selector);
        })
        return array;
    }  
  
    render(){
        let sortedBySelector = this.sortFunc(this.state.list);
        console.log(this.state.list)
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

export default withRouter(GroceryList);