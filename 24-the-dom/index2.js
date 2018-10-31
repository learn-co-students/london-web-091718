const parentEl = document.querySelector('#root')

/* Long, pure JS way */
// const divEl = document.createElement('div')
// const childDiv = document.createElement('div')
// const childUl = document.createElement('ul')
// const listEl1 = document.createElement('li')
// const listEl2 = document.createElement('li')
// const listEl3 = document.createElement('li')

// divEl.appendChild(childDiv)
// divEl.appendChild(childUl)
// childUl.appendChild(listEl1)
// childUl.appendChild(listEl2)
// childUl.appendChild(listEl3)

// listEl1.innerText = 'List item 1'
// listEl2.innerText = 'List item 2'
// listEl3.innerText = 'List item 3'

/* Shorter way, using innerHTML */
const divEl = document.createElement('div')
divEl.innerHTML = `
  <div>Some text</div>
  <ul>
    <li>List item 1</li>
    <li>List item 2</li>
    <li>List item 3</li>
  </ul>
`

parentEl.appendChild(divEl)
