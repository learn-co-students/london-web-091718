const formEl = document.querySelector('#poke-form')
const nameInput = document.querySelector('#poke-name')
const imageInput = document.querySelector('#poke-image')
const pokeList = document.querySelector('#poke-list')

const renderPokemon = pokemon => {
  const pokeItem = document.createElement('li')
  pokeItem.innerHTML = `
    <div class='poke-item'>
      <img src='${pokemon.image}' />
      <h3>${pokemon.name}</h3>
      <button class='delete-button'>X</button>
    </div>
  `
  const pokeButton = pokeItem.querySelector('.delete-button')
  pokeButton.addEventListener('click', () => {
    pokeItem.remove()
  })

  pokeList.appendChild(pokeItem)
}

const pokemonIsValid = pokemon => {
  const validImage = pokemon.image.length > 10 && pokemon.image.startsWith('http')
  const validName = pokemon.name.length >= 3
  return validImage && validName
}

pokemon = {name: 'Pikachu', image: 'path_to_img'}

formEl.addEventListener('submit', event => {
	event.preventDefault()
  console.log('form submitted!')
  const pokemon = {
    name: nameInput.value,
    image: imageInput.value
  }

  if (pokemonIsValid(pokemon)) {
    // addPokemonToServer(pokemon)
    renderPokemon(pokemon)
    formEl.reset()
  }
})

document.addEventListener('click', event => {
  if (event.target.className === 'delete-button') {
    console.log('deleting a pokemon!')
  }
})
