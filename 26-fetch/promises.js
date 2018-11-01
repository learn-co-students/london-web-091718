// Promises, promises...

// get all of the pokemon from the database
getPokemons = () =>
  fetch('http://localhost:3000/pokemons')
	  .then(resp => resp.json())

// get a single pokemon from the database
getPokemon = id =>
  fetch(`http://localhost:3000/pokemons/${id}`)
	  .then(resp => resp.json())

// create a new pokemon in the database
const createPokemon = pokemon =>
	fetch('http://localhost:3000/pokemons', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(pokemon)
	}).then(resp => resp.json())

// remove a pokemon from the database
const deletePokemon = pokemon =>
	fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
		method: 'DELETE'
  })

// update an existing pokemon in the database
const updatePokemon = pokemon =>
	fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(pokemon)
  })
