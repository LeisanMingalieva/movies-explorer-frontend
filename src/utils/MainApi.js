import { moviesUrl, BASE_URL } from "./constants";

const checkResponse = res => {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`Ой, ошибка ${res.status}`)
}

const request = (urlEndpoint, options) => {
    return fetch(`${BASE_URL}${urlEndpoint}`, options)
        .then(checkResponse)
}

export const register = ({ name, email, password }) => {
    return request('/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
}

export function authorize ({ email, password }) {
    return request('/signin', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
}

export function updateUser ({ name, email }) {
    return request('/users/me', {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name, email })
    })
}

export function tokenCheck(token) {
    return request('/users/me', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

// export function getUserData() {
//     return request('/users/me', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
// 	        'Accept': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//     })
// }

export function getSavedMovies() {
    return request('/movies', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
	        'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const saveMovie = (movie) => {
    return request('/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
	        'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            country: movie.country,
            director:movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: `${moviesUrl}${movie.image.url}`,
            trailerLink: movie.trailerLink,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
            thumbnail: `${moviesUrl}${movie.image.url}`,
            movieId: movie.id
        })
    })
}

export const deleteMovie = (movieId) => {
    return request(`/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
	        'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
}