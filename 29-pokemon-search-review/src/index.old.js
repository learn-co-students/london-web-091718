// query items that are already on the page
// which we will need to interact with
const inputEl = document.querySelector("#pokemon-search-input")
const pokeList = document.querySelector("#pokemon-container")
let filter = ''
let localPokemons = []

// render a single pokemon
const renderPokemon = pokemon => {
  const pokeItem = document.createElement('div')
  pokeItem.className = 'pokemon-container'
  pokeItem.innerHTML = `
  <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
    <h1 class="center-text">${pokemon.name}</h1>
    <div style="width:239px;margin:auto">
      <div style="width:96px;margin:auto">
        <img
          data-id="67"
          data-action="flip"
          class="toggle-sprite"
          src="${pokemon.sprites.front}"
        >
      </div>
    </div>
  </div>
  `
  const imgEl = pokeItem.querySelector('.toggle-sprite')
  imgEl.addEventListener('click', () => {
    imgEl.src = imgEl.src === pokemon.sprites.front ?
    pokemon.sprites.back :
    pokemon.sprites.front
  })
  pokeList.appendChild(pokeItem)
}

// render multiple pokemon
const renderPokemons = pokemons =>
  pokemons.forEach(pokemon => renderPokemon(pokemon))

// update the list
const updateList = (pokemons) => {
  pokeList.innerHTML = ''
  renderPokemons(pokemons)
}

// listen for user input
inputEl.addEventListener('keyup', () => {
  console.log(inputEl.value)
  filter = inputEl.value
  const filteredPokemons = localPokemons.filter(
    pokemon => pokemon.name.toLowerCase().includes(filter.toLowerCase())
  )
  updateList(filteredPokemons)
})

API.getPokemons()
  .then(pokemons => {
    localPokemons = pokemons
    updateList(pokemons)
  }) 
