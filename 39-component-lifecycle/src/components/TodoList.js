import React from 'react'

import Todo from './Todo'

const TodoList = ({ todos, completeTodo }) =>
  <ul>
    {
      todos.map(todo =>
        <Todo
          key={todo.id}
          todo={todo}
          completeTodo={completeTodo}
        />
      )
    }
  </ul>

export default TodoList
