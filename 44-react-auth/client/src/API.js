class API {
  static signin (user) {
    return fetch('http://localhost:3001/signin', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    }).then(resp => resp.json())
  }

  static validate () {
    return this.get('http://localhost:3001/validate')
  }

  static getInventory () {
    return this.get('http://localhost:3001/inventory')
  }

  static get (url) {
    return fetch(url, {
      headers: {
        'Authorization': localStorage.getItem('token')
      },
    }).then(resp => resp.json())
  }
}

export default API
