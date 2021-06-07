import { gql } from '@apollo/client'

export const GET_MOVIES = gql`
    query getMovies {
      movies {
        _id
        title
        overview
        poster_path
        popularity
        tags
      },
      tvSeries {
        _id
        title
        overview
        poster_path
        popularity
        tags
      }
    }
  `

export const ADD_MOVIE = gql`
  mutation addMovie($input: dataMovie) {
    addMovie(newMovie: $input) {
      title
    }
  }
`

export const GET_FAVORITES = gql`
  query GetFavorites {
    favorites @client
  }
`