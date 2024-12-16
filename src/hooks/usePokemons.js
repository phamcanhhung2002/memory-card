import { useEffect, useState } from "react";

const pokemonsUrl = 'https://pokeapi.co/api/v2/pokemon?limit=12'

const fetchPokemons = async () => {
  const response = await fetch(pokemonsUrl);

  if (response.status >= 400) {
    throw new Error("server error");

  }
  const data = await response.json();
  const {results} = data;
  const pokemonResponses = await Promise.all(results.map((result) => fetch(result.url)));

  if (pokemonResponses.some(res => res.status >= 400)) {
    throw new Error("server error");
  }

  const pokemons = await Promise.all(pokemonResponses.map(res => res.json()))

  return pokemons.map(({id, name, sprites, ...data}) => ({
    id,
    name,
    image: sprites.front_default
  }))
}

export default function usePokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemons()
    .then(data => setPokemons(data))
    .catch(e => {
      setError(e)
    })
    .finally(() => setLoading(false));
  }, []);

  return [pokemons, error, loading];
}