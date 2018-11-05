class PokemonList {
  constructor() {
    this.pokemons = []
    this.inputEl = document.querySelector("#pokemon-search-input")
    this.pokeList = document.querySelector("#pokemon-container")
  }

  renderPokemons() {
    this.pokemons.forEach(pokemon => pokemon.render())
  }

  updateList() {
    this.pokeList.innerHTML = ''
    this.renderPokemons(this.pokemons)
  }
}