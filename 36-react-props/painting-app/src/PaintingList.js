import React from 'react'
import Painting from './Painting'
import paintings from './paintings'


const PaintingList = (props) => {
  props.greet()
  return <ul>
    {
      paintings.map(painting =>
        <Painting key={painting.id} painting={painting} />
      )
    }
  </ul>
}

export default PaintingList
