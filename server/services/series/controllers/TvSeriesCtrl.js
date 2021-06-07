const TvSeries = require('../models/TvSeries')

class TvSeriesCtrl {
  static async findAll(req, res, next) {
    try {
      const tvSeries = await TvSeries.findAll()
      res.status(200).json(tvSeries)
    } catch (error) {
      next(error)
    }
  }

  static async findOne(req, res, next) {
    try {
      const id = req.params.id
      const found = await TvSeries.findOne(id)
      res.status(200).json(found)
    } catch (error) {
      next(error)
    }
  }

  static async addTvSeries(req, res, next) {
    try {
      const newSeries = {
        title       : req.body.title,
        overview    : req.body.overview,
        poster_path : req.body.poster_path,
        popularity  : req.body.popularity,
        tags        : req.body.tags
      }
      const tvSeries = await TvSeries.addTvSeries(newSeries)
      res.status(201).json(tvSeries.ops[0])
    } catch (error) {
      next(error)
    }
  }

  static async updateTvSeries(req, res, next) {
    try {
      const updateData = {
        title       : req.body.title,
        overview    : req.body.overview,
        poster_path : req.body.poster_path,
        popularity  : req.body.popularity,
        tags        : req.body.tags
      }
      const id = req.params.id
      await TvSeries.updateTvSeries(updateData, id)
      res.status(200).json({ message: 'Updated Success!'})
    } catch (error) {
      next(error)
    }
  }

  static async deleteTvSeries(req, res, next) {
    try {
      const id = req.params.id
      const deleteTvSeries = await TvSeries.deleteTvSeries(id)
      res.status(200).json(deleteTvSeries)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TvSeriesCtrl