import React from 'react'

const UpdateForm = ({ movie, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <label>Title: </label>
    <input
      name='title'
      type='text'
      placeholder='New title'
      value={movie.title}
      onChage={handleChange}
    />
    <lable>Director: </lable>
    <input
      name='director'
      type='text'
      placeholder='New Director'
      value={movie.director}
      onChange={handleChange}
    />
  </form>
)

export default UpdateForm
