import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

const MuseumPicker = ({ updateFilter, filterOn }) => {
  return (
    <div className='row'>
      <div className='ui menu'>
        <div className={`${filterOn ? '' : 'active'} item`} onClick={() => updateFilter('')}>All Museums</div>
        <div className={`${filterOn ? 'active' : ''} item`} onClick={() => updateFilter('national gallery')}>National Gallery of Art, Washington D.C.</div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  filterOn: state.filter !== ''
})

export default connect(mapStateToProps, actions)(MuseumPicker)
