import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Image, Collapse, Button, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
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
    if (sessionStorage.getItem('name') != null) {
        let name = sessionStorage.getItem("name");
        return(
            <div id="navvy">
                <Navbar light expand="md">
                    <NavbarBrand href="/main"><img src='./images/1.png'/></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto"  navbar>
                            <NavItem>
                                <NavLink href="/profile" style={{color: 'black'}}>Hello, {name}!</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/house" style={{color: 'black'}} >Create House</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/join-house" style={{color: 'black'}}>Join House</NavLink>
                            </NavItem>
                            <NavItem>
                                <Button action onClick={this.navLogOut} >Logout</Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    } else {
        return(                                                                                   
        <div id="navvy">
            <Navbar light expand="md">
                <NavbarBrand className='nav-brand' href="/main"><img src='./images/1.png'/></NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/signUp" style={{color: 'black'}}>SignUp</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/login" style={{color: 'black'}}>Login</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
  }
}}

export default withRouter(Navvy);

