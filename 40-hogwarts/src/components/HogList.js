import React from 'react'

import Hog from './Hog'

export default ({ hogs }) =>
  <ul>
    {
      hogs.map((hog, index) => <Hog key={hog.name} hog={hog} />)
    }
  </ul>
