"use client";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';

export default function PokeNavBarNoSearchComp() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href='/'>The Pokédex Workshop</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href='/'>Home</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
