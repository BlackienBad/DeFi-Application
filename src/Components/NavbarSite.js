import React, { useState } from 'react';
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom';
import { Button , Navbar, Form, FormControl, Nav, NavDropdown, } from 'react-bootstrap';
import './NavbarSite.css'

const Example = (props) => {

  return (
    <div>
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home">Example-Swap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link><Link to="/" style={{textDecoration: 'none', color: 'white'}}>Liquidity Pool</Link></Nav.Link>
                  <Nav.Link><Link to="/nft" style={{textDecoration: 'none', color: 'white'}}>NFT</Link></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
  );
}

export default Example;
