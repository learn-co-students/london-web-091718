const getData = (url) => {
    return fetch(url)
        .then(response => response.json());
};

const updateUsersList = (url, selectedBookObj) => {
    console.log(selectedBookObj);
    return fetch(`${url}/${selectedBookObj.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({users: selectedBookObj.users})
    })
};