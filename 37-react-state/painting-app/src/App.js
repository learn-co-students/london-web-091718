import React, {Component} from 'react'
import PaintingList from './PaintingList'
import Navbar from './Navbar'
import SearchBar from './SearchBar'
import PaintingDetails from './PaintingDetails'

class App extends Component {

  state = {
    filter: '',
    selectedPainting: null
  }

  updateFilter = newFilter => {
    this.setState({ filter: newFilter }, () => console.log(this.state))
  }

  deselectPainting = () => {
    this.setState({ selectedPainting: null })
  }

  selectPainting = painting => {
    this.setState({ selectedPainting: painting })
  }

  render() {
    return (
      <div className="App">
        <Navbar
          color='blue'
          title='Welcome to my painting app!'
          subtitle="Isn't this cool!?"
          icon='react'
        />
        { !this.state.selectedPainting && <SearchBar updateFilter={this.updateFilter} /> }
        {
          this.state.selectedPainting ?
            <PaintingDetails
              deselectPainting={this.deselectPainting}
              handleClick={() => console.log('cool!')}
            /> :
            <PaintingList selectPainting={this.selectPainting} filter={this.state.filter} />
        }
      </div>
    )
  }
  
}

export default App
