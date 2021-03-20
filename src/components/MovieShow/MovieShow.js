import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Redirect, Link } from 'react-router-dom'
import { movieShow, movieDelete } from '../../api/movies'

import Spinner from 'react-bootstrap/Spinner'

class MovieShow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      movie: null,
      deleted: false
    }
  }

  componentDidMount () {
    const { msgAlert, user, match } = this.props

    movieShow(match.params.id, user)
      .then(res => this.setState({ movie: res.data.movie }))
      .then(() => msgAlert({
        heading: 'Loaded Movie Sucessfully',
        message: 'Viewing the movie!',
        variant: 'success'
      }))
      .catch(error => msgAlert({
        heading: 'Failed to load the movie, spectacularly',
        message: 'Could not load the movie with error: ' + error.message,
        variant: 'danger'
      }))
  }

  deleteMovie = () => {
    const { msgAlert, user, match } = this.props

    movieDelete(match.params.id, user)
      .then(() => this.setState({ deleted: true }))
      .then(() => msgAlert({
        heading: 'Deleted Movie Sucessfully',
        message: 'Deleting the movie!',
        variant: 'danger'
      }))
      .catch(error => msgAlert({
        heading: 'Failed to delete the movie, spectacularly',
        message: 'Could not delete the movie with error: ' + error.message,
        variant: 'success'
      }))
  }

  render () {
    const { movie, deleted } = this.state

    if (deleted) {
      return <Redirect to="/movies" />
    }
    if (!movie) {
      return (
        <Spinner variant='secondary' animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>{movie.title}</h3>
          <p>{movie.director}</p>
          <button onClick={this.deleteMovie}>Delete Movie</button>
          <button><Link to={`/update-movie/$${movie._id}`}>Update Movie</Link></button>
        </div>
      </div>
    )
  }
}

export default withRouter(MovieShow)
