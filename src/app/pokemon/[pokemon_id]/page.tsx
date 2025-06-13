// Instructs React (Next.js) to run this code on the client side.
// Next.js by default would render this content on the server side where the application is hosted.
'use client'
import Pokemon from '@/model/pokemon';
import { useEffect, useState } from 'react';
import { Row, Col, Container, Image } from 'react-bootstrap';
import React from "react";



// This type is used to get the pokemon id from the url path
type Params = {
  params: { pokemon_id: string }
}


// Next.js passes the url parts which are defined between square brackets []
// to the function which renders the page.


// In our case http://localhost:3000/pokemon/2 is the URL.
// Where the 2 is the [pokemon_id] and passed as a parameter.
export default function PokemonPage({ params }: Params) {
    const {pokemon_id} = React.use(params);
   //pokemon - A constant state variable which stores the pokemon information and retains the data between renders.
   //setPokemon - A state setter function to update the variable and trigger React to render the component again.
   const [pokemon, setPokemon] = useState<Pokemon>();


   useEffect(() => {
       const fetchData = async () => {
           const resp = await fetch('/pokemons.json');
           // Creating a Map out of the raw json
           const pokemons: Map<string, Pokemon> = new Map(Object.entries(await resp.json()));
           const currentPokemon = pokemons.get(pokemon_id);
           setPokemon(currentPokemon);
           console.log(currentPokemon);
       };


       fetchData()
           // Making sure to log errors on the console
           .catch(error => {
               console.error(error);
           });
   }, []);


   return (
       <Container>
           <Row className="justify-content-md-center">
               <Col md="auto"><h1>{pokemon?.pokemonName}</h1></Col>
           </Row>
           <Row>
               <Col >
                   <Image src={pokemon?.mainImage} thumbnail />
               </Col>
               <Col>
                   Pokémon Properties
               </Col>
           </Row>
       </Container>
   );
}

