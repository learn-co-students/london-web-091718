import React from 'react'

import Item from './Item'

class Inventory extends React.Component {
  state = {
    items: [
      {
        id: 1,
        name: 'Item 1',
        description: 'Stuff'
      },
      {
        id: 2,
        name: 'Item 2',
        description: 'Stuff'
      },
      {
        id: 3,
        name: 'Item 3',
        description: 'Stuff'
      }
    ]
  }

  style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap'
  }

  componentDidMount () {
    const { history, username } = this.props
    if (!username) {
      history.push('/signin')
    }
  }

  render () {
    const { items } = this.state

    return (
      <div style={this.style} className='user-list'>
        <h3>Here's your inventory:</h3>
        { items.length === 0 && <p>Sorry, you don't have any items.</p>}
        {
          items.map(item =>
            <Item key={item.id} item={item} />
          )
        }
      </div>
    )
  }
}

export default Inventory
