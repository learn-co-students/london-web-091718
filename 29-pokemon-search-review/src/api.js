// all API calls go here
class API {

  getPokemons() {
    return fetch('http://localhost:3000/pokemon')
      .then(resp => resp.json())
  }

  deletePokemon() {

  }

  updatePokemon () {
    
  }
}

