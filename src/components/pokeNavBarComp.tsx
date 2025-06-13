"use client";


import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Form } from 'react-bootstrap';

interface PokeNavBarCompProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}


export default function PokeNavBarComp({ searchQuery, setSearchQuery }: PokeNavBarCompProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href='/'>The Pokédex Workshop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href='/'>Home</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={handleChange}
            />
          </Form>
        </Container>
      </Navbar>
    </>
  );
}
