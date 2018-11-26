import React from 'react'
import Painting from './Painting'
import paintings from './paintings'


class PaintingList extends React.Component {

  state = {
    paintings: paintings
  }

  getFilteredPaintings = () =>
    this.state.paintings
      .filter(painting => painting.title.includes(this.props.filter))

  render() {
    return <ul className='painting-list'>
      {
        this.getFilteredPaintings().map(painting =>
          <Painting
            handleClick={this.props.selectPainting}
            key={painting.id}
            painting={painting}
          />
        )
      }
    </ul>
  }
}

export default PaintingList
