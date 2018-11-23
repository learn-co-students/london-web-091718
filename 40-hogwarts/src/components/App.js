import React, { Component } from 'react'
import '../App.css'
import Nav from './Nav'
import HogList from './HogList'
import hogs from '../porkers_data'

const weight = 'weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water'

class App extends Component {

  state = {
    hogs: hogs,
    filterGreased: false,
    sortBy: ''
  }

  toggleFilter = () => {
    this.setState({ filterGreased: !this.state.filterGreased })
  }

  changeSortBy = (newSortBy) => {
    this.setState({ sortBy: newSortBy })
  }

  getFilteredHogs = () => {
    const { hogs, filterGreased } = this.state
    const filteredHogs = filterGreased ?
      hogs.filter(hog => hog.greased) :
      hogs.slice()
    return filteredHogs
  }

  sortHogs = (hogs) => {
    switch (this.state.sortBy) {
      case 'name':
        return hogs.sort((a, b) => a.name.localeCompare(b.name))
      case 'weight':
        return hogs.sort((a, b) => a[weight] - b[weight])
      default:
        return hogs
    }
  }

  render () {
    const {
      getFilteredHogs,
      toggleFilter,
      changeSortBy,
      sortHogs
    } = this
    const filteredHogs = getFilteredHogs()
    const sortedHogs = sortHogs(filteredHogs)
    return (
      <div className='App'>
        <Nav toggleFilter={toggleFilter} changeSortBy={changeSortBy} />
        <HogList hogs={sortedHogs} />
      </div>
    )
  }
}

export default App
