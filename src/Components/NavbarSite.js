import React from 'react';
import {Link} from 'react-router-dom';
import { Navbar, Nav} from 'react-bootstrap';

const Example = ({account}) => {

  return (
    <div>
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand>Example-Swap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link><Link to="/" style={{textDecoration: 'none', color: '#ffb805'}}>Liquidity Pool</Link></Nav.Link>
                  <Nav.Link><Link to="/nft" style={{textDecoration: 'none', color: '#ffb805'}}>NFT</Link></Nav.Link>
                  <Nav.Link><Link to="/balance" style={{textDecoration: 'none', color: '#ffb805'}}> Balance </Link></Nav.Link>
                </Nav>
                <Navbar.Text>account: {account}</Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    </div>
  );
}

export default Example;
