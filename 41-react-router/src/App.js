import React, {Component} from 'react'
import PaintingList from './PaintingList'
import Navbar from './Navbar'
import SearchBar from './SearchBar'
import PaintingDetails from './PaintingDetails'

import Home from './Home'

import { Route, Switch } from 'react-router-dom'

class App extends Component {

  state = {
    filter: ''
  }

  updateFilter = newFilter => {
    this.setState({ filter: newFilter }, () => console.log(this.state))
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
        {/* { !this.state.selectedPainting && <SearchBar updateFilter={this.updateFilter} /> } */}
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/paintings' component={routerProps =>
            <PaintingList
              selectPainting={this.selectPainting}
              filter={this.state.filter}
              {...routerProps}
            />}
          />
          <Route path='/paintings/:id' component={PaintingDetails}/>
          <Route component={props => <h1>Page not found!</h1>} />
        </Switch>
      </div>
    )
  }
  
}

export default App
