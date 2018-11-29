import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search, Dropdown } from 'semantic-ui-react'
import _ from 'lodash'

const sortOptions = [
  {
    text: 'HP',
    value: 'hp'
  },
  {
    text: 'Name',
    value: 'name'
  },
  {
    text: 'Default',
    value: 'default'
  }
]
// friendOptions = [
//   {
//     text: 'Jenny Hess',
//     value: 'Jenny Hess',
//     image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
//   },
//  ...
// ]

class PokemonPage extends React.Component {

  state = {
    pokemons: [],
    searchQuery: '',
    sortType: 'hp'
  }

  componentDidMount() {
    fetch('http://localhost:3000/pokemon')
      .then(res => res.json())
      .then(pokemons => this.setState({ pokemons }))
  }

  changeSearchQuery = (e, { value }) => {
    this.setState({
      searchQuery: value
    })
  }

  changeSortType = (e, { value }) => {
    this.setState({
      sortType: value
    })
  }

  filterPokemon = (pokemons) => {
    return pokemons.filter(p => p.name.includes(this.state.searchQuery))
  }

  sortPokemon = (pokemons) => {
    if (this.state.sortType === 'hp') {
      return pokemons.sort((a, b) => {
        return a.stats.find(s => s.name === "hp").value - b.stats.find(s => s.name === "hp").value
      })
    } else if (this.state.sortType === 'name') {
      return pokemons.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    } else {
      return pokemons
    }
  }

  addNewPokemon = newPokemon => {
    console.log(newPokemon)
    const pokeObject = {
      name: newPokemon.name,
      stats: [
        {
          name: 'hp',
          value: newPokemon.hp
        }
      ],
      sprites: {
        front: newPokemon.frontUrl,
        back: newPokemon.backUrl
      }
    }

    this.setState({
      pokemons: [...this.state.pokemons, pokeObject]
    })
  }

  render() {
    const pokemonToDisplay = this.filterPokemon(this.state.pokemons)
    const sortedPokemon = this.sortPokemon(pokemonToDisplay)

    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <Dropdown placeholder='Sort by' selection options={sortOptions} onChange={this.changeSortType} />
        <br />
        <Search onSearchChange={_.debounce(this.changeSearchQuery, 50)} showNoResults={false} value={this.state.searchQuery} />
        <br />
        <PokemonCollection pokemons={sortedPokemon} />
        <br />
        {
          pokemonToDisplay.length === 0 && <PokemonForm addNewPokemon={this.addNewPokemon} />
        }
      </div>
    )
  }
}

export default PokemonPage
