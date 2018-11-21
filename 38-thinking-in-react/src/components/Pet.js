import React from 'react'

class Pet extends React.Component {
  render () {
    const { pet, adoptPet } = this.props
    return (
      <div className='card'>
        <div className='content'>
          <a className='header'>
            { pet.gender === 'female' ? '♀' : '♂'}
            { pet.name }
          </a>
          <div className='meta'>
            <span className='date'>{ pet.type }</span>
          </div>
          <div className='description'>
            <p>Age: { pet.age }</p>
            <p>Weight: { pet.weight }</p>
          </div>
        </div>
        <div className='extra content'>
          {
            pet.isAdopted
              ? <button className='ui disabled button'>Already adopted</button>
              : <button onClick={() => adoptPet(pet)} className='ui primary button'>Adopt pet</button>
          }
        </div>
      </div>
    )
  }
}

export default Pet
