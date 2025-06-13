"use client";

import PokemonsComp from "@/components/pokemonsComp";
import PokeNavBar from "@/components/pokeNavBarComp";
import Pokemon from "@/model/pokemon";
import PokemonCard from "@/model/pokemonCard";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

export default function Home() {
  const [pokemons, setPokemons] = useState<PokemonCard[]>([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 50;

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch("/pokemons.json");
      const data: Pokemon[] = await resp.json();
      const pokemonCards: PokemonCard[] = data
        .map((p) => ({
          pokemonNumber: p.pokemonNumber,
          pokemonName: p.pokemonName,
          pokemonType: p.pokemonType,
          mainImage: p.mainImage,
        }))
        .sort((a, b) => a.pokemonNumber - b.pokemonNumber);
      setPokemons(pokemonCards);
    };

    fetchData().catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const filteredPokemons = pokemons.filter((p) =>
    p.pokemonName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredPokemons.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const currentPokemons = filteredPokemons.slice(
    startIndex,
    startIndex + pageSize
  );

  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));

  return (
    <>
      <PokeNavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <PokemonsComp
        pokemons={currentPokemons}
        page={page}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <Container className="d-flex justify-content-center pb-4">
        <Button onClick={handlePrev} disabled={page === 1} className="me-2">
          Previous
        </Button>
        <Button onClick={handleNext} disabled={page === totalPages}>
          Next
        </Button>
      </Container>
    </>
  );
}
