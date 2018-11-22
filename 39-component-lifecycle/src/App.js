import React, { Component } from 'react'

import TodoList from './components/TodoList'

console.log(React)

class App extends Component {
  state = {
    todos: [],
    showCompleted: false
  }

  completeTodo = id => {
    /*
    // make a shallow copy of all the todos
    // (the array is a new one, but everything inside is the same)
    const todos = [...this.state.todos]

    // find the todo we want to change by id
    // (this todo is still the same as the one that's currently in our state)
    const foundTodo = todos.find(todo => todo.id === id)

    // make a deep copy of it so that we can safely mutate it
    const foundTodoCopy = JSON.parse(JSON.stringify(foundTodo))

    // complete it
    foundTodoCopy.completed = true

    // find where the original, uncompleted todo is in the array
    const index = todos.indexOf(foundTodo)

    // replace it with our new, completed copy
    todos[index] = foundTodoCopy

    // replace the old array in the state with our new copy
    this.setState({ todos })
    */

    const todos = this.state.todos.map(todo => todo.id === id
      ? {...todo, completed: true}
      : todo
    )
    this.setState({ todos })

    // You could also complete a todo on the server if needed
    // API.completeTodo(id) 
  }

  componentDidMount () {
    console.log('App mounted!')
    this.getTodos()
  }

  getTodos = () => {
    console.log('getting todos!')
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(resp => resp.json())
      .then(todos => this.setState({ todos }))
  }

  getIncompleteTodos = () => {
    return this.state.todos.filter(todo => !todo.completed)
  }

  render () {
    console.log(this.state)
    const { completeTodo } = this
    // this.getTodos() // << infinite loop incoming!
    const incompleteTodos = this.getIncompleteTodos()

    return (
      <div id='app'>
        <h1>React Component Lifecycle</h1>
        <TodoList completeTodo={completeTodo} todos={incompleteTodos} />
      </div>
    )
  }
}

export default App
