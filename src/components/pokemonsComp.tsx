"use client";


import Container from "react-bootstrap/Container";
import PokemonCard from "@/model/pokemonCard";
import { Row, Col, Button } from "react-bootstrap";
import PokemonCardComp from "@/components/pokemonCardComp";




interface PokemonsCompProps {
  pokemons: PokemonCard[];
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}


export default function PokemonsComp({
  pokemons,
  page,
  totalPages,
  onPrev,
  onNext,
}: PokemonsCompProps) {
  return (
    <>
      <Container className="d-flex justify-content-center pt-4">
        <Button onClick={onPrev} disabled={page === 1} className="me-2">
          Previous
        </Button>
        <div className="align-self-center">{`Page ${page}/${totalPages}`}</div>
        <Button onClick={onNext} disabled={page === totalPages} className="ms-2">
          Next
        </Button>
      </Container>
      <Container className="pt-4 pb-4">
        <Row xs={1} md={3} lg={5} className="g-4">
          {pokemons.map((pokemon) => (
            <Col key={pokemon.pokemonNumber}>
              <PokemonCardComp pokemon={pokemon} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
