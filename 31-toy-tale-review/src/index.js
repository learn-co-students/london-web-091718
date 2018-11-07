const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const toyListEl = document.querySelector('#toy-collection');
let addToy = false;
const toysUrl = 'http://localhost:3000/toys';
let newToy = {
  name: '',
  image: '',
  likes: 0
};

let toysList = [];

const toyElement = (toy) => {
    const toyWrapper = document.createElement('div');
    toyWrapper.classList.add('card');
    const likeString = toy.likes === 1 ? `${toy.likes} Like` : `${toy.likes} Likes`;

    toyWrapper.innerHTML = `
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${likeString}</p>
        <button class="like-btn" data-toy-id=${toy.id}>Like <3</button>
    `;

    toyWrapper.querySelector('button').addEventListener('click', (event) => {
        const id = event.target.dataset.toyId;
        toy.likes += 1;

        likeToyUpdate(toysUrl, id, toy.likes)
            .then(() => {
                toyWrapper.querySelector('p').innerHTML = toy.likes === 1 ? `${toy.likes} Like` : `${toy.likes} Likes`
            });
    });
    toyListEl.appendChild(toyWrapper);
};

const renderToyList = (toys) => {
    toys.forEach(toy => {
        toyElement(toy)
    })
};

// EventListeners
document.addEventListener('DOMContentLoaded', () => {
    getToys(toysUrl)
        .then(toys => {
            toysList = [...toys];
            renderToyList(toysList);
        })
});

addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
        toyForm.style.display = 'block';
        const form = toyForm.querySelector('.add-toy-form');

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            newToy.name = form.querySelector("input[name='name']").value;
            newToy.image = form.querySelector("input[name='image']").value;
            addToyToDb(toysUrl ,newToy)
                .then(newToy => {
                    toysList.push(newToy);
                    toyElement(newToy);
                    newToy.name = '';
                    newToy.image = '';
                    form.reset();
                })
        });
        // submit listener here
    } else {
        toyForm.style.display = 'none'
    }
});


// OR HERE!
