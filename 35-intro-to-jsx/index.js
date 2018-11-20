// Intro to JSX

// a simple React element
// createElement takes 3 arguments: type of element, props and children
const Title = React.createElement('h1', {}, 'Welcome to React!')
// we can pass a single child, or multiple by passing an array []
const Title = React.createElement('h1', {}, ['Welcome to React!', 'cool!'])

/* Article element with hardcoded values */
// const Article = React.createElement('div', {}, [
//   React.createElement('h1', {}, 'Welcome to React!'),
//   React.createElement('p', {}, 'This is some text for this article.')
// ])

/* Article component which takes props
to create different articles easily */
const Article = (props) => React.createElement('div', {}, [
  React.createElement('h2', {}, props.title),
  React.createElement('p', {}, props.content)
])

// Here's how we can use Article to create new instances
Article({title: 'Welcome to React again!!!', content: 'Nice, right?!'})
Article({title: 'Second title here!', content: 'Not very creative, right?!'})

const Newspaper = React.createElement('div', {}, [
  React.createElement('h1', {}, 'Welcome to my Newspaper!'),
  Article({title: 'Welcome to React again!!!', content: 'Nice, right?!'}),
  Article({title: 'Second title here!', content: 'Not very creative, right?!'}),
  articleElements
])

// just some article data
// the kind we may get from an API
const articleData = [
  {title: 'Title1', content: 'content1'},
  {title: 'Title2', content: 'content2'},
  {title: 'Title3', content: 'content3'},
  {title: 'Title3', content: 'content3'},
  {title: 'Title3', content: 'content3'},
  {title: 'Title3', content: 'content3'},
  {title: 'Title3', content: 'content3'},
  {title: 'Title3', content: 'content3'},
  {title: 'Title3', content: 'content3'}

]

// we can map over article data above
// and transform them into React elements!
const articleElements = articleData.map(article => Article(article))


/* NavBar without JSX */
// const NavBar = props =>
//   React.createElement('div', { className: `ui inverted ${props.color} menu` }, 
//     React.createElement('a', { className: 'item' },
//       React.createElement('h2', { className: 'ui header' }, [
//         React.createElement('i', { className: `${props.icon} icon` }),
//         React.createElement('div', { className: "content" }, props.title),
//         React.createElement('div', { className: "sub header" }, props.subtitle),
//       ])
//     )
//   )

/* NavBar with JSX */
const NavBar = props => {
  console.log('props:', props)
  return <div className={`ui inverted ${props.color} menu`}>
    <a className='item'>
      <h2 className="ui header">
        <i className={`${props.icon} icon`}></i>
        <div className="content">
          {props.title}
        </div>
        <div className="sub header">
          {props.subtitle.toUpperCase()}
        </div>
        {
          props.names.map((name, idx) => <li key={idx}>{name}</li>)
        }
      </h2>
    </a>
  </div>
}

// ReactDOM's render method takes 2 arguments:
ReactDOM.render(
  // what to put on the page
  <NavBar
    color='blue'
    title='Hello React!'
    subtitle="Isn't this cool!?"
    icon='react'
  />,
  // and where to put it
  document.querySelector('#root')
)
