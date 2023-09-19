import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pokemon.css';

const Pokemon = () => {
  const [pokemon, setPokemon] = useState(null);
  const [guess, setGuess] = useState('');
  const [submitted, setSubmitted] = useState(false); // track if user has submitted their guess
  const [pokemonIndex, setPokemonIndex] = useState(0); // keep track of current Pokemon index
  const [showResult, setShowResult] = useState(false); // track if result should be shown

  const handleGuess = (event) => {
    setGuess(event.target.value);
  };

  const handleNextPokemon = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=905');
      const pokemonList = response.data.results;
      const randomIndex = Math.floor(Math.random() * pokemonList.length);
      const randomPokemon = await axios.get(pokemonList[randomIndex].url);
      setPokemon(randomPokemon.data);
      setPokemonIndex(prevIndex => prevIndex + 1);
      setGuess('');
      setSubmitted(false);
      setShowResult(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setShowResult(true);
  };
  

  useEffect(() => {
    const fetchRandomPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=905');
        const pokemonList = response.data.results;
        const randomIndex = Math.floor(Math.random() * pokemonList.length);
        const randomPokemon = await axios.get(pokemonList[randomIndex].url);
        setPokemon(randomPokemon.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRandomPokemon();
  }, []);

  return (
    <div className='container'>
      <h1>Who's That Pokemon?</h1>
      {pokemon && (
        <>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className={!submitted ? 'blur' : ''}
          />
          <input
            type="text"
            value={guess}
            onChange={handleGuess}
            placeholder="Make a guess"
            disabled={submitted} // disable input when guess is submitted
          />
          {!submitted && ( // show submit button only if guess is not yet submitted
            <button onClick={handleSubmit}>Submit</button>
          )}
          {submitted && (
            <>
              <h2 className={guess.toLowerCase() === pokemon.name.toLowerCase() ? 'highlight' : 'wrong'}>
                {pokemon.name}
              </h2>
              {showResult && (
                <button onClick={handleNextPokemon}>Next Pokemon</button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Pokemon;

