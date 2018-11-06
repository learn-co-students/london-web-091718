// Get stuff I need that's already on the page
const filterDogButton = document.querySelector("#good-dog-filter")
const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")

// all data needed by our application
let state = {
  dogs: [],
  filterGoodDogs: false
}

// create a single dog bar item
const renderDogBarItem = dog =>
  `<span data-id=${dog.id} class='dog-bar-item'>${dog.name.toUpperCase()}</span>`

// put them on the page
const updateDogBar = () => {
  const dogBarHTML = filteredDogs()
    .map(dog => renderDogBarItem(dog))
    .join('')

  dogBar.innerHTML = dogBarHTML
}

// a single event listener to listen to span clicks
document.addEventListener('click', event => {
  if (event.target.className === 'dog-bar-item') {
    const id = event.target.dataset.id
    const foundDog = state.dogs.find(dog => dog.id === parseInt(id))
    displayDog(foundDog)
  }

  if (event.target.className === 'toggle-dog-button') {
    const id = event.target.dataset.id
    const foundDog = state.dogs.find(dog => dog.id === parseInt(id))
    toggleGoodDog(foundDog)
    updateDogBar()
    updateDog(foundDog)
  }
})

// put the dog on the page
const displayDog = dog => {
  dogInfo.innerHTML = `
    <img src=${dog.image}>
    <h2>${dog.name}</h2>
    <button class='toggle-dog-button' data-id=${dog.id}>${dog.isGoodDog ? 'Good' : 'Bad'} Dog!</button>
  `
}

// update the dog
const toggleGoodDog = dog => {
  // change the server data
  // change the local data
  dog.isGoodDog = !dog.isGoodDog
  // update the page
  displayDog(dog)
}

// get all dogs or only good dogs, depending on filter state
const filteredDogs = () => state.filterGoodDogs ?
  state.dogs.filter(dog => dog.isGoodDog) :
  state.dogs

// turn the filter on or off
const toggleFilter = () => {
  state.filterGoodDogs = !state.filterGoodDogs
  filterDogButton.innerText = state.filterGoodDogs ?
    'Filter good dogs: ON' :
    'Filter good dogs: OFF'
}

// listen for filter button clicks
filterDogButton.addEventListener('click', () => {
  toggleFilter()
  updateDogBar()
})

getDogs()
  .then(dogs => {
    state.dogs = dogs
    updateDogBar()
  })
  
  