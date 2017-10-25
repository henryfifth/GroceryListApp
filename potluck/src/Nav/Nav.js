import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Collapse, Button, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import './Nav.css'


class Navvy extends Component {
  constructor(){
    super()
    this.toggle = this.toggle.bind(this);
    this.navLogOut = this.navLogOut.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  navLogOut(){
    this.props.logOut()
    .then(()=>{
    this.props.history.push("/login");   
    })       
  }

  render(){
    console.log(this.props)
    if (sessionStorage.getItem('name') != "") {
      let name = sessionStorage.getItem("name");    
      return(
      <div id="navvy">
      <Navbar light expand="md">
        <NavbarBrand href="/main">Potluck</NavbarBrand>
        <NavItem>
              Hello, {name}!
            </NavItem>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/house" >Create House</NavLink>
            </NavItem>
            <NavItem>
            <NavLink href="/join-house" >Join House</NavLink>
            </NavItem>
            <NavItem>
            <Button action onClick={this.navLogOut} >Logout</Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
      )} else {
    return(                                                                                   
    <div id="navvy">
        <Navbar light expand="md">
          <NavbarBrand href="/main">Potluck</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/signUp">SignUp</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/login" >Login</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
  )
  }
}}

export default withRouter(Navvy);