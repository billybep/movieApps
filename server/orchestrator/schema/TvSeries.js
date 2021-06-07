const { gql } = require('apollo-server')
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()
const tvSerieURL = 'http://localhost:4002'  //tvserie services


module.exports = {
  typeDefs: gql`

    type TvSerie {
      _id: ID,
      title: String,
      overview: String,
      poster_path:String,
      popularity: Float,
      tags: [String]
    }

    extend type Query {
      tvSeries: [TvSerie]
      tvSerie(_id: ID!): TvSerie
    }

    input dataTvSerie {
      title: String,
      overview: String,
      poster_path: String,
      popularity: Float,
      tags: [String]  
    }

    extend type Mutation {
      addTvSerie(newTvSerie: dataTvSerie): TvSerie
      updateTvSerie(updateTvSerie: dataTvSerie, _id: String): successUpdate
      deleteTvSerie(_id: String): TvSerie
    }
  `,

  resolvers: {
    Query: {
      tvSeries: () => {
        return redis
          .get('tvSeries')
          .then(tvSeries => {
            if (!tvSeries) {
              return axios({
                url: tvSerieURL + '/tv',
                method: 'GET'
              })
              .then(({ data }) => {
                redis.set('tvSeries', JSON.stringify(data))
                return data
              })
              .catch(e => { throw(e) })
            } else return JSON.parse(tvSeries)
          })
      },
  
      tvSerie(_, {_id}) {
        return axios({
          url: tvSerieURL + `/tv/${_id}`,
          method: 'GET'
        })
          .then(({ data }) => data)
          .catch(e => { throw(e) })
      },
    },
    Mutation: {
      
      addTvSerie: (_, {newTvSerie}) => {
        const newDataTvSerie = {
          title: newTvSerie.title,
          overview: newTvSerie.overview,
          poster_path: newTvSerie.poster_path,
          popularity: newTvSerie.popularity,
          tags: newTvSerie.tags
        }
        return axios({
          url: tvSerieURL + '/tv',
          method: 'POST',
          data: newDataTvSerie
        })
          .then(({ data }) => data, redis.del('tvSeries'))
          .catch(e => { throw(e) })
      },

      updateTvSerie: (_, {updateTvSerie, _id}) => {
        return axios({
          url: tvSerieURL + `/tv/${_id}`,
          method: 'PUT',
          data: updateTvSerie
        })
          .then( _ => { 
            redis.del('tvSeries')
            return { message: 'success updated' } 
          })
          .catch(e => { throw(e) })
      },

      deleteTvSerie: (_, {_id}) => {
        return axios({
          url: tvSerieURL + `/tv/${_id}`,
          method: "DELETE"
        })
          .then(({ data }) => data.value, redis.del('tvSeries'))
          .catch(e => { throw(e) })
      }
    }
  }
}