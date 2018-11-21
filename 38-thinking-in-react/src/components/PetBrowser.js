import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  render () {
    const { pets, adoptPet } = this.props

    return <div className='ui cards'>
      {
        pets.map(pet => <Pet pet={pet} adoptPet={adoptPet} />)
      }
    </div>
  }
}

export default PetBrowser
