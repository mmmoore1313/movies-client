import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import { movieUpdate } from '../../api/movies'

class UpdateMovie extends Component {
  constructor (props) {
    super(props)

    this.state = {
      movie: {
        title: '',
        director: ''
      },
      updated: false
    }
  }

  componentDidMount () {
    const { msgAlert, user, match } = this.props

    movieUpdate(match.params.id, user)
      .then(res => this.setState({ movie: res.data.movie }))
      .then(() => msgAlert({
        heading: 'Updated Movie Sucessfully',
        message: 'Updating the movie!',
        variant: 'secondary'
      }))
      .catch(error => msgAlert({
        heading: 'Failed to update the movie, spectacularly',
        message: 'Could not update the movie with error: ' + error.message,
        variant: 'success'
      }))
  }

  handleInputChage = (event) => {
    event.persist()

    this.setState(currState => {
      const { name, value } = event.target
      const updatedField = {
        [name]: value
      }
      const newMovie = {
        ...currState.movie,
        ...updatedField
      }
      return { movie: newMovie }
    })
  }

  render () {
    const { movie, updated } = this.state

    if (updated) {
      return <Redirect to={`/movies/${movie._id}`} />
    }

    return (
      <Fragment>
        <h2>Update Movie</h2>
      </Fragment>
    )
  }
}

export default UpdateMovie
