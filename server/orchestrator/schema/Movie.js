const { gql } = require('apollo-server')
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()
const movieURL = 'http://localhost:4001'  //movie services

module.exports = {
  typeDefs: gql`

    type Movie {
      _id: ID,
      title: String,
      overview: String,
      poster_path:String,
      popularity: Float,
      tags: [String]
    }

    extend type Query {
      movies: [Movie]
      movie(_id: ID!): Movie
    }

    input dataMovie {
      title: String,
      overview: String,
      poster_path: String,
      popularity: Float,
      tags: [String]
    }

    extend type Mutation {
      addMovie(newMovie: dataMovie): Movie
      updateMovie(updateMovie: dataMovie, _id: String): successUpdate
      deleteMovie(_id: String): Movie
    }
  `,

  resolvers: {
    Query: {
      movies: () => {
        return redis
          .get('movies')
          .then(movies => {
            if (!movies) {
                return axios({
                url: movieURL + '/movies',
                method: 'GET'
              })
                .then(({ data }) => {
                  redis.set('movies', JSON.stringify(data))
                  return data
                })
                .catch(e => { throw(e) })
            } else return JSON.parse(movies)
          })
      },
      
      movie(_, {_id}) {
        return axios({
          url: movieURL + `/movies/${_id}`,
          method: 'GET'
        })
          .then(({ data }) => data)
          .catch(e => { throw(e) })
      }
    },

    Mutation: {
      addMovie: (_, {newMovie}) => {
        const newDataMovie = {
          title: newMovie.title,
          overview: newMovie.overview,
          poster_path: newMovie.poster_path,
          popularity: newMovie.popularity,
          tags: newMovie.tags
        }
        return axios({
          url: movieURL + '/movies',
          method: 'POST',
          data: newDataMovie
        })
          .then(({ data }) => data, redis.del('movies'))
          .catch(e => { throw(e) })
      },
      updateMovie: (_, {updateMovie, _id}) => {
        return axios({
          url: movieURL + `/movies/${_id}`,
          method: 'PUT',
          data: updateMovie
        })
          .then( _ => { 
            redis.del('movies')
            return { message: 'success updated' } 
          })
          .catch(e => { throw(e) })
      },
      deleteMovie: (_, {_id}) => {
        return axios({
          url: movieURL + `/movies/${_id}`,
          method: "DELETE"
        })
          .then(({ data }) => data.value, redis.del('movies'))
          .catch(e => { throw(e) })
      }
    }
  }
}