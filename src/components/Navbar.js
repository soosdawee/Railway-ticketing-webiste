import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { userData } from '../helper';
import { useNavigate } from 'react-router-dom';

function NavbarComp() {
  const username = userData().username;
  const navigate = useNavigate();

  const logoutAttempt = async () => {
     localStorage.setItem('user', "");
     navigate('/login');
  };

  return (
    <Navbar className="navbar" expand="lg" collapseOnSelect>
      <Container className='navbar-container' >
        <Navbar.Brand href="/home" className="navbar-brand">
          <img src={process.env.PUBLIC_URL + "/wumpus.png"} alt='Wumpus' width={50}/>
          <Nav className="links-to-pages">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/map">View Map</Nav.Link>
          <Nav.Link href="/ticketing">Embark on journeys</Nav.Link>
          <Nav.Link href="/mytickets">My tickets</Nav.Link>
        </Nav>
        </Navbar.Brand>
        
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="navbar-logout">
          <Nav.Link onClick={logoutAttempt} >Log out</Nav.Link>
        </Nav>
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
