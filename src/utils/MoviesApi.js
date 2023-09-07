export const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

const checkResponse = res => {
    if(res.ok) {
        return res.json()
    }
    return Promise.reject(`Ой, ошибка ${res.status}`)
}

export const getMovies = () => {
    return fetch(BASE_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(checkResponse)
}

