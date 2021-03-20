import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Import our axios request to get all movies
import { movieIndex } from '../../api/movies'

import Spinner from 'react-bootstrap/Spinner'

class MovieIndex extends Component {
  constructor (props) {
    super(props)

    // keep tract of the movies in state, intially we don't have movies
    this.state = {
      movies: null
    }
  }

  // Once the component is created and inserted into the dom (mounted)
  componentDidMount () {
    // destructure our props
    const { msgAlert, user } = this.props

    // fetch all of our movies
    movieIndex(user)
      // set the movies state to the movies we got back in our response's data
      .then(res => this.setState({ movies: res.data.movies }))
      .then(() => msgAlert({
        heading: 'Loaded Movies Sucessfully',
        message: 'Viewing all movies; click on one to see its page',
        variant: 'success'
      }))
      .catch(error => msgAlert({
        heading: 'Failed to load movies, spectacularly',
        message: 'Could not load movies with error: ' + error.message,
        variant: 'danger'
      }))
  }

  render () {
    // destrcuture the movies
    const { movies } = this.state

    // If we don't have any movies, show that we are loading them
    if (!movies) {
      return (
        <Spinner variant='secondary' animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    const moviesJsx = movies.map(movie => (
      // Create a link to each individual movie
      <Link to={`/movies/${movie._id}`} key={movie._id}>
        <li>
          {movie.title}
        </li>
      </Link>
    ))

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>MOOOOOOVIES</h3>
          <ul>
            {moviesJsx}
          </ul>
        </div>
      </div>
    )
  }
}

export default MovieIndex
