import React from 'react'

const PaintingDetails = props =>
  <div onClick={props.handleClick}>
    <button onClick={props.deselectPainting}>BACK</button>
    Painting details here!
  </div>

export default PaintingDetails
