const url = 'http://localhost:3000/books';
const booksListEl = document.querySelector('#list');
const showPanelEl = document.querySelector('#show-panel');
let booksList = [];
let selectedBook = null;
const activeUser = {
    "id": 101,
    "username": "Potato"
};

const booksListItemEl = (book) => {
    let booksListItemEl = document.createElement('li');
    booksListItemEl.classList.add('books_list_item');

    booksListItemEl.innerText = book.title;
    booksListItemEl.setAttribute('data-book-id', book.id);

    booksListEl.appendChild(booksListItemEl);
};

const renderBooksList = (booksList) => {
    booksList.forEach(book => {
        booksListItemEl(book);
    })
};

document.addEventListener("DOMContentLoaded", function () {
    getData(url)
        .then(bookList => {
            booksList = [...bookList];
            renderBooksList(booksList);
        })
});

const renderBookCard = (selectedBook) => {
    const bookCardEl = document.createElement('div');
    bookCardEl.classList.add('book_card');
    const disabled = !!selectedBook.users.find(user => user.id === activeUser.id) ? 'disabled' : '';
    showPanelEl.innerHTML = '';
    bookCardEl.innerHTML = `
        <h3>${selectedBook.title}</h3>
        <img src=${selectedBook.img_url} alt=${selectedBook.title}>
        <p>${selectedBook.description}</p>
        <ul>
            ${selectedBook.users.map(user => `<li>${user.username}</li>`).join('')}
        </ul>
        <button ${disabled} data-book-id=${selectedBook.id} class="like_btn">Like the book</button>
    `;
    showPanelEl.appendChild(bookCardEl);
};

booksListEl.addEventListener('click', (event) => {
    // console.log(event.target);
    if (event.target.classList.contains('books_list_item')) {
        const bookId = parseInt(event.target.dataset.bookId);
        selectedBook = booksList.find(book => book.id === bookId);
        renderBookCard(selectedBook)
    }
});

showPanelEl.addEventListener('click', event => {
    if (event.target.classList.contains('like_btn')) {
        selectedBook.users.push(activeUser);
        console.log(selectedBook);
        updateUsersList(url, selectedBook)
            .then(() => {
                renderBookCard(selectedBook);
            });
    }
});