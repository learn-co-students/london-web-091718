import React from 'react'

import { Link } from 'react-router-dom'

import logo from '../logo.svg'

const Header = ({ username, signout }) =>
  <header className='App-header'>
    <img src={logo} className='App-logo' alt='logo' />
    <h1 className='App-title'>
      {
        username ?
          `Welcome back, ${username}!` :
          'Welcome to React.'
      }
      <br />
      {
        username ?
          <button onClick={signout}>SIGN OUT</button> :
          <Link to='/signin'><button>SIGN IN</button></Link>
      }
    </h1>
  </header>

export default Header
