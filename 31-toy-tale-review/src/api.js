const getToys = (url) => {
    return fetch(url)
        .then(response => response.json())
};

const addToyToDb = (url, newToy) => {
    return fetch(url, {
        method: 'POST',
        headers:
            {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
        body: JSON.stringify(newToy)
    })
        .then(response => response.json())
};

const likeToyUpdate = (url, id, likes) => {
    return fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers:
            {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
        body: JSON.stringify({likes})
    })
        .then(response => response.json())
};