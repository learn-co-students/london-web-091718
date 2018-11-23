import React from 'react'

const weight = 'weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water'

export default class Hog extends React.Component {
  state = {
    clicked: false
  }

  toggleDetails = () => {
    this.setState({ clicked: !this.state.clicked })
  }

  render () {
    const { toggleDetails } = this
    const { hog } = this.props
    const { clicked } = this.state

    const imageUrl = hog.name.toLowerCase().replace(/\s/g, '_')
    const image = require(`../hog-imgs/${imageUrl}.jpg`)
    return <li>
      <img onClick={toggleDetails} src={image} />
      {
        clicked &&
          <div className='hog-details'>
            <p>Name: {hog.name}</p>
            <p>Speciality: {hog.specialty}</p>
            <p>Weight: {hog[weight]}</p>
          </div>
      }
    </li>
  }
}
