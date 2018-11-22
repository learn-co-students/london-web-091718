import React from 'react'

class Todo extends React.Component {
  componentDidMount () {
    console.log(`Mounting: `, this.props.todo.title)
  }

  componentWillUnmount () {
    console.log(`Hey, I'm ${this.props.todo.title}. WHY ARE YOU DOING THIS TO ME?!?!?!`)
  }

  render () {
    const { todo, completeTodo } = this.props
    return <li onClick={() => completeTodo(todo.id)}>{todo.title}</li>
  }
}

export default Todo
