import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  adoptPet = petToChange => {
    const pets = [...this.state.pets]
    const foundPet = pets.find(pet => pet.id === petToChange.id)
    const foundPetCopy = JSON.parse(JSON.stringify(foundPet))
    foundPetCopy.isAdopted = true
    const index = pets.indexOf(petToChange)
    pets[index] = foundPetCopy
    this.setState({ pets })
    // pets = [123, 124, 125] << 120
    // shallowCopy = [123, 124, 125] << 121
    // deepCopy = [223, 224, 225] << 121
  }

  updateFilter = newFilter => {
    this.setState({ filters: { type: newFilter } })
  }

  getPets = () => {
    const { type } = this.state.filters
    const url = type === 'all'
      ? '/api/pets'
      : `/api/pets?type=${type}`

    fetch(url)
      .then(resp => resp.json())
      .then(pets => this.setState({ pets }))
  }

  render () {
    const { updateFilter, getPets, adoptPet } = this
    const { pets } = this.state

    return (
      <div className='ui container'>
        <header>
          <h1 className='ui dividing header'>React Animal Shelter</h1>
        </header>
        <div className='ui container'>
          <div className='ui grid'>
            <div className='four wide column'>
              <Filters
                updateFilter={updateFilter}
                getPets={getPets}
              />
            </div>
            <div className='twelve wide column'>
              <PetBrowser pets={pets} adoptPet={adoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
