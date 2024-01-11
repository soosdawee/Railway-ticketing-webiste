import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function TextLinkExample() {
  return (
    <Navbar className="navbar" expand="lg" >
      <Container className='navbar-container' >
        <Navbar.Brand href="/" className="navbar-brand">
          <img src={process.env.PUBLIC_URL + "/wumpus.png"} alt='Wumpus' width={50}/>
          <Nav className="links-to-pages">
          <Nav.Link href="/" >Home</Nav.Link>
          <Nav.Link href="/map">View Map</Nav.Link>
          <Nav.Link href="/destinations">Browse destinations</Nav.Link>
          <Nav.Link href="/ticketing">Embark on journeys</Nav.Link>
        </Nav>
        </Navbar.Brand>
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Navbar.Text className="navbar-text">
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TextLinkExample;
