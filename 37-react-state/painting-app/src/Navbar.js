import React from 'react'

const Navbar = props =>
  <div className={`ui inverted ${props.color} menu`}>
    <a className='item'>
      <h2 className="ui header">
        <i className={`${props.icon} icon`}></i>
        <div className="content">
          {props.title}
        </div>
        <div className="sub header">
          {props.subtitle.toUpperCase()}
        </div>
      </h2>
    </a>
  </div>

export default Navbar
