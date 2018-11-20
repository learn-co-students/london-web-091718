import React from 'react'

const SearchBar = props =>
  <input onChange={event => props.updateFilter(event.target.value)}  />

export default SearchBar
  