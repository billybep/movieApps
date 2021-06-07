const Movie = require('../models/Movie')

class MovieCtrl {
  static async findAll(req, res, next) {
    try {
      const movies = await Movie.findAll()
      res.status(200).json(movies)
    } catch (error) {
      console.log(error)
    }
  }

  static async findOne(req, res, next) {
    try {
      const id = req.params.id
      const found = await Movie.findOne(id)
      res.status(200).json(found)
    } catch (error) {
      console.log(error)
    }
  }

  static async addMovie(req, res, next) {
    try {
      const newMovie = req.body
      const movie = await Movie.addMovie(newMovie)
      res.status(201).json(movie)
    } catch (error) {
      console.log(error)
    }
  }

  static async updateMovie(req, res, next) {
    try {

      const updateData = req.body
      const id = req.params.id
      const updatedMovie = await Movie.updateMovie(updateData, id)
      res.status(200).json(updatedMovie)
    } catch (error) {
      console.log(error)
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      const id = req.params.id
      const deleteMovie = await Movie.deleteMovie(id)
      res.status(200).json(deleteMovie)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = MovieCtrl