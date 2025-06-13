// Instructs React (Next.js) to run this code on the client side.
// Next.js by default would render this content on the server side where the application is hosted.
'use client'
import Pokemon from '@/model/pokemon';
import { useEffect, useState } from 'react';
import { Row, Col, Container, Image } from 'react-bootstrap';



// This type is used to get the pokemon id from the url path
type Params = {
  params: { pokemon_id: string }
}


// Next.js passes the url parts which are defined between square brackets []
// to the function which renders the page.


// In our case http://localhost:3000/pokemon/2 is the URL.
// Where the 2 is the [pokemon_id] and passed as a parameter.
export default function PokemonPage({ params }: Params) {
  const { pokemon_id } = params;
  // pokemon - A state variable that stores the pokemon information.
  const [pokemon, setPokemon] = useState<Pokemon>();


  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch('/pokemons.json');
      const data: Pokemon[] = await resp.json();
      const currentPokemon = data.find(
        (p) => p.pokemonNumber === Number(pokemon_id)
      );
      setPokemon(currentPokemon);
    };

    fetchData().catch((error) => {
      console.error(error);
    });
  }, [pokemon_id]);


  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h1>{pokemon?.pokemonName}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Image src={pokemon?.mainImage} thumbnail />
        </Col>
        <Col>Pokémon Properties</Col>
      </Row>
    </Container>
  );
}

