import React, { useState } from 'react';
import { Button , Navbar, Form, FormControl, Nav, NavDropdown, } from 'react-bootstrap';

const Example = (props) => {

  return (
    <div>
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home">Example-Swap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#home">Liquidity Pool</Nav.Link>
                <Nav.Link href="#link">NFT</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
  );
}

export default Example;
