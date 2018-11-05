class Pokemon {
  constructor(pokemon) {
    this.name = pokemon.name
    this.frontImage = pokemon.sprites.front
    this.backImage = pokemon.sprites.back
    this.pokeList = document.querySelector("#pokemon-container")
  }

  editName (newName) {
    const nameEl = this.pokeItem.querySelector('h1')
    nameEl.innerText = newName
    this.name = newName
  }

  remove () {
    this.pokeItem.remove()
  }

  flipImage () {
    const imgEl = this.pokeItem.querySelector('.toggle-sprite')
    imgEl.src = imgEl.src === this.frontImage ?
      this.backImage :
      this.frontImage
  }

  render () {
    const pokeItem = document.createElement('div')
    pokeItem.className = 'pokemon-container'
    pokeItem.innerHTML = `
    <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
      <h1 class="center-text">${this.name}</h1>
      <div style="width:239px;margin:auto">
        <div style="width:96px;margin:auto">
          <img
            data-id="67"
            data-action="flip"
            class="toggle-sprite"
            src="${this.frontImage}"
          >
        </div>
      </div>
    </div>
    `
    pokeItem.addEventListener('click', () => this.flipImage())
    this.pokeItem = pokeItem
    pokeList.appendChild(pokeItem)
  }
}
