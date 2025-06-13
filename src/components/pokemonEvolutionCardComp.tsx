"use client";

import Pokemon from "@/model/pokemon";
import { Card, Image } from "react-bootstrap";

interface PokemonEvolutionCardCompProps {
  pokemon: Pokemon;
}

export default function PokemonEvolutionCardComp({ pokemon }: PokemonEvolutionCardCompProps) {
  const pokemonUrl = `/pokemon/${pokemon.pokemonNumber}`;
  return (
    <a href={pokemonUrl} className="text-decoration-none">
      <Card className="align-items-center p-2">
        {pokemon.mainImage && (
          <Image
            src={pokemon.mainImage}
            width={80}
            height={80}
            roundedCircle
            className="mb-2"
          />
        )}
        <Card.Text>{pokemon.pokemonName}</Card.Text>
      </Card>
    </a>
  );
}
