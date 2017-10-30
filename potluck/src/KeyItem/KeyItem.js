import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './KeyItem.css';


export default class KeyItem extends Component {
  constructor() {
    super()
    
  }


  render() {
    console.log(this.props); 
    var userColor = this.props.housemate.color;
    var userFirstName = this.props.housemate.firstName

      return (
        <tr className='key-row'>
          <td><Button style={{backgroundColor: userColor}}>{userFirstName}</Button>
          </td>
        </tr>
    )
    }
  }