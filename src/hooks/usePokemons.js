import { useEffect, useState } from "react";

const pokemonsUrl = 'https://pokeapi.co/api/v2/pokemon?limit=12'

const fetchPokemons = async () => {
  const response = await fetch(pokemonsUrl);
  const data = await response.json();
  const {results} = data;
  const pokemonResponses = await Promise.all(results.map((result) => fetch(result.url)));
  const pokemons = await Promise.all(pokemonResponses.map(res => res.json()))
  return pokemons.map(({id, name, sprites, ...data}) => ({
    id,
    name,
    image: sprites.front_default
  }))
}

export default function usePokemons() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetchPokemons()
    .then(data => setPokemons(data))
    .catch(e => {
      console.log('Fetch pokemons fail. Error: ', e)
    });
  }, []);

  return pokemons;
}