// query items that are already on the page
// which we will need to interact with
const inputEl = document.querySelector("#pokemon-search-input")
const pokeList = document.querySelector("#pokemon-container")
let filter = ''
let localPokemons = []

// render multiple pokemon
const renderPokemons = pokemons =>
  pokemons.forEach(pokemon => pokemon.render())

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

getPokemons()
  .then(pokemons => {
    localPokemons = pokemons.map(pokemon => new Pokemon(pokemon))
    updateList(localPokemons)
  })
