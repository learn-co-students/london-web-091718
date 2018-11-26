import React from 'react'
import { Link } from 'react-router-dom'

import paintings from './paintings'

const PaintingDetails = props => {
  const painting = paintings.find(painting => painting.id === props.match.params.id)
  return <div onClick={props.handleClick}>
    <Link to='/paintings'>
      <button>BACK</button>
    </Link>
    <br />
    <p>{painting.title}</p>
    <p>{painting.artist.name}</p>
  </div>
}

export default PaintingDetails
