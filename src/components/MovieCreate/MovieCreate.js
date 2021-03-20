import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import MovieForm from '../MovieForm/MovieForm'

import { movieCreate } from '../../api/movies'

class MovieCreate extends Component {
  constructor (props) {
    super(props)

    // Add a movie object to state, with an initially empty title and director
    this.state = {
      movie: {
        title: '',
        director: ''
      },
      // include an id for the created movie. We will redirect to this id, once our movie has been created
      createdMovieId: null
    }
  }

  handleChange = event => {
    // we will try to access the event after the handleChange function has finished to make sure the event properties aren't null, we need to persist them
    event.persist()

    this.setState(state => {
      // return our state change
      return {
        // set the movie state to have the same properties it used to have (...state.movie)
        // but replace the proeprty with `name` to its current `value`
        // ex name could be `title or `director`
        movie: { ...state.movie, [event.target.name]: event.target.value }
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    // desctructure our props and state
    const { user, msgAlert } = this.props
    const { movie } = this.state

    // create a movie using our axios request
    movieCreate(movie, user)
      // set the createdMovieId to the _id of the movie we got in the response's data
      .then(res => this.setState({ createdMovieId: res.data.movie._id }))
      .then(() => msgAlert({
        heading: 'Created Movie Sucessfully',
        message: 'Showing Created movie',
        variant: 'success'
      }))
      .catch(error => msgAlert({
        heading: 'Failed to create movie, spectacularly',
        message: 'Could not create movie with error: ' + error.message,
        variant: 'danger'
      }))
  }

  render () {
    // Destructure our state
    const { movie, createdMovieId } = this.state

    // once our movie has been created and we have stored its id
    if (createdMovieId) {
      // redirect to the movie's show page
      return <Redirect to={`/movies/${createdMovieId}`} />
    }

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Create Movie</h3>
          {/* Add the movie form for creating a movie */}
          <MovieForm
            movie={movie}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
        </div>
      </div>
    )
  }
}

export default MovieCreate
