# React Redux

### Resources
- [Todo / Counter App](https://stackblitz.com/edit/react-mod4-react-redux)
- [Teacher Upvoter](https://stackblitz.com/edit/mod4-teacher-upvoter-redux-starter-code)

### React App Walk Through

Take this time to show how the application functions in the browser. It is ideal to have state held locally inside of a `Container` component that App renders. Then, have a `List` component that has state passed down as props. In the `List` component, iterate over the objects in state to load a single list item in a `Detail` component.

Students usually have a hard time grasping the core of redux and will get lost in all the set up that needs to take place. Emphasize that a majority of the code to implement Redux is predominately boilerplate and keep the React app simple so that they can focus on Redux portion. If there is a domain that the students are familiar with from previous lectures or review sessions, bring those up as examples and explain how Redux would allow them to access information without passing it down as a prop through multiple components.

##### React App Component Hierarchy
* App
* Container
  - In here, pass down all local state as a prop to `List`
* List
  - Iterate through all of the items inside of props and pass a single item to the `Detail` component
* Detail

##### React App Local State

`State` in the `Container` component should point to an object with a key of some type of attribute, such as `instructors`. In this application, is ideal to have one key inside the `instructor` object point to an integer, such as a `votes` key that points to `0`. There can be another key that points to a `boolean`, such as a `inNYC` key that returns a `boolean` value depending on if that instructor currently teaches in Manhattan.

```js
  state = {
    instructors: {
      one: { id: 'one', name: 'Steven', age: 100, votes: 0, inNYC: true },
      two: { id: 'two', name: 'Niky', age: 101, votes: 0, inNYC: false },
      three: { id: 'three', name: 'Tim', age: 102, votes: 0, inNYC: false }
    }
  }
```

##### React App Functionality

* Create an `upVote` and `downVote` function that will use `this.setState` to either increment or decrement the votes for that `instructor` and update state inside the `Container` component

* Pass the `upVote` and `downVote` functions as a prop to the `List` component

```
class Container extends Component {
  state = {
    instructors: {
      one: { ... },
      two: { ... },
      three: { ... }
    }
  }

  upVote = instructorId => {
    this.setState({
      instructors: {
        ...this.state.instructors,
        [instructorId]: {
          ...this.state.instructors[instructorId],
          votes: this.state.instructors[instructorId].votes + 1
        }
      }
    })
  }

  downVote = instructorId => {
    this.setState({
      instructors: {
        ...this.state.instructors,
        [instructorId]: {
          ...this.state.instructors[instructorId],
          votes: this.state.instructors[instructorId].votes - 1
        }
      }
    })
  }

  render() {
    return (
      <div>
        <List instructors={this.state.instructors} upVote={this.upVote} downVote={this.downVote} />
      </div>
    )
  }
}

export default Container;
```

* Iterate over the props inside the `List` component and render a `Detail` component for each `instructor` object

* Display all of the features of each `instructor` in the `Detail` component

* Create a `+` and `-` button that will invoke the `upVote` or `downVote` function, which will invoke the `upVote` function passed down as a prop with the `instructor.id` as an argument and update state in the `Container` component

```js
  const upVote = () => {
    props.upVote(props.instructor.id);
  }

  const downVote = () => {
    props.downVote(props.instructor.id);
  }
```

* Reiterate that state should not be directly mutated and `this.setState` should instead use the spread operator

### Implement Redux and React-Redux Libraries

* Install and save the `react-redux` and `redux` libraries into the application

* In `index.js`, import the `Provider` from `react-redux` and `createStore` function from `redux`

* Create the store by invoking the `createStore` function and saving it to a variable, i.e. `store`

* `Console.log` the store inside `index.js` and go inside the Developers Console inside the browser and show the functions provided with the store

* Pass the `store` to the `<Provider />` as a prop and then wrap the `<App />` inside the `<Provider />`

### Hold State Inside Store

The students now need to understand that state is changing from being accessible inside every component as long as you pass it down as a prop. Now, instead of passing state down a lot of components, we will have it inside the store. The store can be explained as the gatekeeper, so to speak, that will only allow a component to access state if it requests it from the store through redux.

* Create a `reducer.js` file in the `src` folder that exports the `rootReducer` function. Separate reducers can be introduced later

*
```js
export function rootReducer(state = defaultState, action){
    switch(action.type) {
      default:
        return state;
    }
}
```

* Move the local state from the `Container` component into the `reducer.js` and save it to a `defaultState` variable. Add in a `console.log` after `store` is logged in `App.js` to log what the state is by `store.getState()`

* At this point, the application will break because state is no longer passed down as a prop but show that state is exactly the same, just held in a different location

* The `List` component no longer takes `instructors` from state as a prop and can be rendered without any props inside the `Container` component

##### Mapping State to Props

* Inside the `List` component, import `connect` from `react-redux`

* Invoke the `mapStateToProps` function so that instructors can still be referenced as a prop, but as a prop from state inside store

*
```js
const mapStateToProps = state => {
    return {
      instructors: state
    }
}
```
* Export the `List` component as connected with the store and to include `mapStateToProps`

* ```js
export default connect(mapStateToProps)(List);
```

### Create Actions and Reducers

Now that state is held inside of the store, the `upVote` and `downVote` functions that update state will need to update state in the `reducer.js` instead. Just like how the previous sections shows that state doesn't change, just the way we access it, the time taken to create these should also include an explanation that an reducer will update the state based on whatever action type we send it.

* Create two actions in an `actions.js` file inside the `src` folder that will take in the `instructorId` so the reducer will know which instructor's votes to update based on the original functionality of the `upVote` and `downVote`

*
```js
export let upVote = instructorId => {
    return {
      type: "INCREASE_VOTE",
      payload: {
        instructorId: instructorId
      }
    }
}
```
```js
export let downVote = instructorId => {
    return {
      type: "DECREASE_VOTE",
      payload: {
        instructorId: instructorId
      }
    }
}
```
* Since there are now different payload types, the `rootReducer` in `reducer.js` will need to account for these in the `switch` statement

*
```js
export let upVote = instructorId => {
    return {
      type: "INCREASE_VOTE",
      payload: {
        instructorId: instructorId
      }
    }
}
```
```js
export function rootReducer(state = defaultState, action){
    switch(action.type) {
      case 'INCREASE_VOTE':
        return {...state,
           instructors: {
             ...state.instructors,
              [action.payload.instructorId]: {
                ...state.instructors[action.payload.instructorId],
                votes: state.instructors[action.payload.instructorId].votes + 1
              }
            }
          }
      case 'DECREASE_VOTE':
        return {...state,
          instructors: {
              ...state.instructors,
              [action.payload.instructorId]: {
                ...state.instructors[action.payload.instructorId],
                votes: state.instructors[action.payload.instructorId].votes - 1
              }
            }
          }
      default:
        return state;
    }
}
```

###Update State Inside Redux Store

Now that our actions have been created, they need to be integrated into the components that will be updating and/or referencing state inside of the store. Again, much of this is boilerplate and should be reiterated as such to the students.

* Import both the `upVote` and `downVote` functions from the `actions.js` file as well as `connect` from `react-redux` into the `Detail` component

* The payload of the action can only be sent to the reducer through dispatch, so the `Detail` component will need to include the `mapDispatchToProps` function as well

*
```js
const mapDispatchToProps = dispatch => {
   return {
    dispatchUpVote: id => dispatch(upVote(id)),
    dispatchDownVote: id => dispatch(downVote(id))
   }
}
```

* Now that we've `mapDispatchToProps`, update the invocation inside the local `upVote` and `downVote` in the `Detail` to now dispatch the action to the reducer with the `instructorId` instead of invoking a function that was passed down as a prop from a parent component

*
```js
const upVote = () => {
   props.dispatchUpVote(props.instructor.id)
}
```
```js
const downVote = () => {
   props.dispatchDownVote(props.instructor.id)
}
```
* Connect the `Detail` component on export and pass it `mapDispatchToProps` as the second argument of the function invocation

*
```js
export default connect(null, mapDispatchToProps)(Detail)
```
