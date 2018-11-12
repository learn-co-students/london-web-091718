let imageId = 1464 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`

const imageEl = document.querySelector('#image')
const nameEl = document.querySelector('#name')
const likesText = document.querySelector('#likes')
const likesButton = document.querySelector('#like_button')
const commentInput = document.querySelector('#comment_input')
const commentForm = document.querySelector('#comment_form')
const commentListEl = document.querySelector('#comments')

// data needed for our app to work
const state = {
  imageData: {}
}

// get image data from the API
const getImageData = () =>
  fetch(imageURL)
    .then(resp => resp.json())

// update image data on the page
const renderImage = () => {
  updateImageSrc()
  updateLikeText()
  updateName()
  updateComments()
}

const updateImageSrc = () => {
  imageEl.src = state.imageData.url
}

const updateLikeText = () => {
  likesText.innerText = state.imageData.like_count
}

const updateName = () => {
  nameEl.innerText = state.imageData.name
}

const updateComments = () => {
  commentListEl.innerHTML = state.imageData.comments.map(comment => `<li>${comment.content}</li>`).join('')
}

const increaseLikes = () => {
  state.imageData.like_count += 1
  updateLikeText()
}

const addComment = comment => {
  state.imageData.comments.push(comment)
  updateComments()
}

getImageData()
  .then(imageData => {
    state.imageData = imageData
    renderImage(state.imageData)
  })

const increaseLikesOnServer = () =>
  fetch(likeURL, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId
    })
  }).then(resp => resp.json())

const createCommentOnServer = content => {
  const options = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId,
      content: content
    })
  }
  
  return fetch(commentsURL, options)
}

// do something when the like button is clicked
likesButton.addEventListener('click', event => {
  increaseLikes()
  increaseLikesOnServer()
})

// do something when the form is submitted
commentForm.addEventListener('submit', event => {
  event.preventDefault()
  const comment = {
    content: commentInput.value
  }
  createCommentOnServer(comment.content)
    .then(() => addComment(comment))
    .catch(() => alert('Unable to create comment. Please try again.'))
  commentForm.reset()
})
