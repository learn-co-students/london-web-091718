// fetch doggies
const getDogs = () =>
  fetch('http://localhost:3000/pups')
    .then(resp => resp.json())

// update dog on the server
const updateDog = dog =>
  fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dog)
  })