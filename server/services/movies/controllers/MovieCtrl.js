const Movie = require('../models/Movie')

class MovieCtrl {
  static async findAll(req, res, next) {
    try {
      const movies = await Movie.findAll()
      res.status(200).json(movies)
    } catch (error) {
      next(error)
    }
  }

  static async findOne(req, res, next) {
    try {
      const id = req.params.id
      const found = await Movie.findOne(id)
      res.status(200).json(found)
    } catch (error) {
      next.log(error)
    }
  }

  static async addMovie(req, res, next) {
    try {
      const newMovie = {
        title       : req.body.title,
        overview    : req.body.overview,
        poster_path : req.body.poster_path,
        popularity  : req.body.popularity,
        tags        : req.body.tags
      } 
      const movie = await Movie.addMovie(newMovie)
      res.status(201).json(movie.ops[0])
    } catch (error) {
      next.log(error)
    }
  }

  static async updateMovie(req, res, next) {
    try {
      const updateData = {
        title       : req.body.title,
        overview    : req.body.overview,
        poster_path : req.body.poster_path,
        popularity  : req.body.popularity,
        tags        : req.body.tags
      }
      const id = req.params.id
      await Movie.updateMovie(updateData, id)
      res.status(200).json({message: 'Updated Success!'})
    } catch (error) {
      next.log(error)
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      const id = req.params.id
      const deleteMovie = await Movie.deleteMovie(id)
      res.status(200).json(deleteMovie)
    } catch (error) {
      next.log(error)
    }
  }
}

module.exports = MovieCtrl