import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import './Nav.css'


export default class Navvy extends Component {
  constructor(){
  super()
  this.toggle = this.toggle.bind(this);
  this.state = {
    isOpen: false
  };
}
toggle() {
  this.setState({
    isOpen: !this.state.isOpen
  });
}


  render(){
    

  return(                                                                                   
    <div id="navvy">
        <Navbar color="success" light expand="md">
          <NavbarBrand href="/">Potluck</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink>SignUp</NavLink>
              </NavItem>
              <NavItem>
                <NavLink >Login</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
  )
  }
}