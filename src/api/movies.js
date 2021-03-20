import axios from 'axios'
import apiUrl from '../apiConfig'

export const movieIndex = user => {
  return axios({
    url: apiUrl + '/movies',
    method: 'GET',
    // include an authorization header, that includes our user's Token
    // so the API knows who to sign out
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

// this function will create a movie using axios
export const movieCreate = (movie, user) => {
  return axios({
    url: apiUrl + '/movies',
    method: 'POST',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    // pass the data to create a movie
    data: { movie }
  })
}

export const movieShow = (id, user) => {
  return axios({
    url: `${apiUrl}/movies/${id}`,
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const movieDelete = (id, user) => {
  return axios({
    url: `${apiUrl}/movies/${id}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const movieUpdate = (id, user) => {
  return axios({
    url: `${apiUrl}/movies/${id}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { id }
  })
}
