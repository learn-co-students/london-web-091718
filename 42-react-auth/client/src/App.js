import React, { Component } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'

import Header from './components/Header'
import SignInForm from './components/SignInForm'
import Inventory from './components/Inventory'

import './App.css'
import API from './API'

class App extends Component {
  state = {
    username: ''
  }

  signin = username => {
    localStorage.setItem('username', username)
    this.setState({ username })
  }

  signout = () => {
    localStorage.removeItem('username')
    this.setState({ username: '' })
  }

  componentDidMount () {
    const username = localStorage.getItem('username')
    API.validate()
      .then(data => {
        if (data.error) {
          this.signout()
        } else {
          this.signin(data.username)
          this.props.history.push('/inventory')
        }
      })
  }

  render() {
    const { signin, signout } = this
    const { username } = this.state
    return (
      <div className="App">
        <Header username={username} signout={signout} />
        <Switch>
          <Route exact path='/' component={() => <h1>Home page!</h1>} />
          <Route path='/signin' component={routerProps => <SignInForm signin={signin} {...routerProps} />} />
          <Route path='/inventory' component={routerProps => <Inventory username={username} {...routerProps} />} />
          <Route component={() => <h1>Page not found.</h1>} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
