import React, { Component } from 'react'
import { connect } from 'react-redux'
import PaintingList from './PaintingList'
import PaintingShow from './PaintingShow'
import * as actions from '../actions/index.js'
// NOTE: actions is a directory.
// By default import will look for a file called index.js in any directory

console.log(actions)

class PaintingContainer extends Component {
  componentDidMount () {
    // NOTE: no async stuff yet. For now we'll
    // just fetch some data in another file.
    // We'll still use the lifecycle method
    // so we can easily add async later
    this.props.fetchPaintings()
  }

  render () {
    console.log('props: ', this.props)
    return (
      <div className='row'>
        <div className='six wide column'>
          <PaintingList paintings={this.props.paintings} />
        </div>
        <div className='ten wide column'>
          {this.props.activePainting ? (
            <PaintingShow painting={this.props.activePainting} />
          ) : (
            <h3>select a painting</h3>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  paintings: state.paintings.filter(painting => painting.museum.name.toLowerCase().includes(state.filter)),
  activePainting: state.paintings.find(p => p.id === state.activePaintingId),
  filter: state.filter
})

// const mapDispatchToProps = dispatch => ({
//   selectPainting: dispatch({ type: 'SELECT_ACTIVE_PAINTING', id: 2 })
// })

// const mapDispatchToProps = {
//   selectPainting: id => ({type: 'SELECT_ACTIVE_PAITNING', id: id})
// }

export default connect(mapStateToProps, actions)(PaintingContainer)
// NOTE: here we're using the shorthand syntax for mapDispatchToProps
// (This is the recommended way to do this)
// it works like this:
// the second arg to connect is an object where the keys
// are the names of the functions we want as props and the values
// are the appropriate action creator functions
// (action creators are just functions which return actions)
