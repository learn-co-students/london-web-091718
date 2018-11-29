class API {
  static signin (user) {
    return fetch('http://localhost:3001/signin', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    }).then(resp => resp.json())
  }

  static validate () {
    return fetch('http://localhost:3001/validate', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('username')
      },
    }).then(resp => resp.json())
  }
}

export default API
