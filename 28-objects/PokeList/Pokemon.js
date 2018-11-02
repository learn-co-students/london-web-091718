class Pokemon {
  constructor(pokemon) {
    this.name = pokemon.name
    this.url = pokemon.url
    this.pokeList = document.querySelector('#pokemon-list')
  }

  addPokemon() {
    const pokeEl = document.createElement('li')
    pokeEl.innerHTML = `
      <li>
        <h2>${this.name}</h2>
        <img src='${this.url}' />
      </li>
    `
    pokeList.appendChild(pokeEl)
  }

}