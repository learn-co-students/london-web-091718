import React from 'react'
import { Link } from 'react-router-dom'

const Painting = props =>
  <li>
    <Link to={`/paintings/${props.painting.id}`}>
      <div className='painting'>
        <img src={props.painting.image} />
        <p>Title: {props.painting.title}</p>
        <p>Artist: {props.painting.artist.name}</p>
        <p>{props.painting.artist.birthday} - {props.painting.artist.deathday}</p>
      </div>
    </Link>
  </li>

export default Painting
