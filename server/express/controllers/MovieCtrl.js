const axios = require('axios')
const baseURL = 'http://localhost:4001'
const Redis = require("ioredis")
const redis = new Redis()

class MovieCtrl {
  static async findAll(req, res, next) {
    redis
      .get('movies')
      .then(movies => {
        if (!movies) {
          axios({
            url: baseURL + '/movies',
            method: 'GET'
          })
            .then(({ data }) => {
              redis.set('movies', JSON.stringify(data))
              res.status(200).json(data)
            })
            .catch(err => next(err))
        }
        else res.status(200).json(JSON.parse(movies))
      })
  }

  static async findOne(req, res, next) {
    const id = req.params.id

    axios({
      url: baseURL + `/movies/${id}`,
      method: 'GET'
    })
      .then(({ data }) => res.status(200).json(data))
      .catch(err => next(err))
  }

  static async addMovie(req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body

    axios({
      url: baseURL + '/movies',
      method: 'POST',
      data: { title, overview, poster_path, popularity, tags } 
    })
      .then(({ data }) => res.status(201).json(data), redis.del('movies'))
      .catch(err => next(err))
  }

  static async updateMovie(req, res, next) {
    const id = req.params.id
    const { title, overview, poster_path, popularity, tags } = req.body
    axios({
      url: baseURL + `/movies/${id}`,
      method: 'PUT',
      data: { title, overview, poster_path, popularity, tags } 
    })
      .then(({ data }) => res.status(200).json(data), redis.del('movies'))
      .catch(err => next(err))
  }

  static async deleteMovie(req, res, next) {
    const id = req.params.id
    axios({
      url: baseURL + `/movies/${id}`,
      method: 'DELETE' 
    })
      .then(({ data }) => res.status(200).json(data), redis.del('movies'))
      .catch(err => next(err))
  }
}

module.exports = MovieCtrl