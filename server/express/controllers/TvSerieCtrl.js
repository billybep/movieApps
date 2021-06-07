const axios = require('axios')
const baseURL = 'http://localhost:4002'
const Redis = require("ioredis")
const redis = new Redis()

class TvSerieCtrl {
  static async findAll(req, res, next) {
    redis
      .get('tvSeries')
      .then(tvSeries => {
        if (!tvSeries) {
          axios({
            url: baseURL + '/tv',
            method: 'GET'
          })
            .then(({ data }) => {
              redis.set('movies', JSON.stringify(data))
              res.status(200).json(data)
            })
            .catch(err => next(err))
        }
        else res.status(200).json(JSON.parse(tvSeries))
      })
  }

  static async findOne(req, res, next) {
    const id = req.params.id

    axios({
      url: baseURL + `/tv/${id}`,
      method: 'GET'
    })
      .then(({ data }) => res.status(200).json(data))
      .catch(err => next(err))
  }

  static async addTvSeries(req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body

    axios({
      url: baseURL + '/tv',
      method: 'POST',
      data: { title, overview, poster_path, popularity, tags } 
    })
      .then(({ data }) => res.status(201).json(data), redis.del('tvSeries'))
      .catch(err => next(err))
  }

  static async updateTvSeries(req, res, next) {
    const id = req.params.id
    const { title, overview, poster_path, popularity, tags } = req.body
    axios({
      url: baseURL + `/tv/${id}`,
      method: 'PUT',
      data: { title, overview, poster_path, popularity, tags } 
    })
      .then(({ data }) => res.status(200).json(data), redis.del('tvSeries'))
      .catch(err => next(err))
  }

  static async deleteTvSeries(req, res, next) {
    const id = req.params.id
    axios({
      url: baseURL + `/tv/${id}`,
      method: 'DELETE' 
    })
      .then(({ data }) => res.status(200).json(data), redis.del('tvSeries'))
      .catch(err => next(err))
  }
}

module.exports = TvSerieCtrl