// Instructs React (Next.js) to run this code on the client side.
// Next.js by default would render this content on the server side where the application is hosted.
'use client'
import Pokemon from '@/model/pokemon';
import { useEffect, useState, Fragment } from 'react';
import { Row, Col, Container, Image, ProgressBar, Card } from 'react-bootstrap';
import PokeNavBarNoSearchComp from '@/components/pokeNavBarNoSearchComp';
import PokemonTypeBadgeComp from '@/components/pokemonTypeBadgeComp';
import PokemonEvolutionCardComp from '@/components/pokemonEvolutionCardComp';
import TYPE_COLORS from '@/utils/typeColors';
import '../evolutionArrows.css';



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
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch('/pokemons.json');
      const data: Pokemon[] = await resp.json();
      setAllPokemons(data);
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
    <>
      <PokeNavBarNoSearchComp />
      <Container className="pt-4 main-container" style={{ maxWidth: '1000px' }}>
        <Row className="justify-content-md-center mb-2">
          <Col md="auto">
            <h1>{pokemon?.pokemonName}</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center mb-4">
          <Col md="auto">
            {pokemon?.pokemonType && (
              <PokemonTypeBadgeComp pokemonTypes={pokemon.pokemonType} />
            )}
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md="4" className="text-center">
          <div className="image-wrapper"><Image src={pokemon?.mainImage} thumbnail /></div>
            
          </Col>
          <Col>
            <h4 className="mb-3">Stats</h4>
            <div className="mb-2">
              <div>Attack</div>
              <ProgressBar
                now={pokemon?.attack || 0}
                max={150}
                label={pokemon?.attack?.toString()}
                striped
                variant="danger"
              />
            </div>
            <div className="mb-2">
              <div>Defense</div>
              <ProgressBar
                now={pokemon?.defense || 0}
                max={180}
                label={pokemon?.defense?.toString()}
                striped
                variant='info'
              />
            </div>
            <div className="mb-2">
              <div>HP</div>
              <ProgressBar
                now={pokemon?.healthPoints || 0}
                max={250}
                label={pokemon?.healthPoints?.toString()}
                striped
                variant="success"
                
              />
            </div>
            <div className="mb-2">
              <div>Speed</div>
              <ProgressBar
                now={pokemon?.speed || 0}
                max={150}
                label={pokemon?.speed?.toString()}
                striped
                variant="warning"
              />
            </div>
          </Col>
        </Row>
        {pokemon?.evolutionFamily?.length ? (
          <Row className="justify-content-center">
            <Col md="auto" className="text-center">
              <h4 className="mb-2">Evolution</h4>

              <div className="d-flex justify-content-center flex-wrap gap-3 align-items-center">
                {pokemon.evolutionFamily.map((name, index) => {
                  const evo = allPokemons.find((p) => p.pokemonName === name);

                  const card = evo ? (
                    <PokemonEvolutionCardComp key={name} pokemon={evo} />
                  ) : (
                    <Card key={name} className="align-items-center p-2">
                      <Card.Text>{name}</Card.Text>
                    </Card>
                  );

                  return (
                    <Fragment key={name}>
                      {card}
                      {index < pokemon.evolutionFamily.length - 1 && (
                        <i className="fa-solid fa-arrow-right evolution-arrow" />
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </Col>
          </Row>
        ) : null}
      </Container>
    </>
  );
}

