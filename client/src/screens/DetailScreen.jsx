import React from 'react'
import { ScrollView, View, Text, Image } from 'react-native'
import { useQuery, gql } from '@apollo/client'
import { Card, Title, Paragraph} from 'react-native-paper'

const DetailScreen = ({ route }) => {

  const id = route.params._id

  const GET_DETAILS_MOVIES = gql`
    query getMoviesById {
      movie(_id: "${id}") {
        _id
        title
        overview
        poster_path
        popularity
        tags
      }
    }
  `

  const { loading, error, data } = useQuery(GET_DETAILS_MOVIES)

  if (loading) return <Text>Loading ....</Text>
  if (error) return <Text>Error ....</Text>

  return(
    <ScrollView style={{ backgroundColor: 'white', paddingHorizontal: 25}}>
      <View style={{ 
          justifyContent: 'center', 
          alignItems: 'center', 
          marginVertical: 50, 
          paddingVertical: 20 
        }}>
        <Card elevation={0} style={{ color : 'white', shadowColor: 'none' }}>
          <Image 
            source={{ uri: data.movie.poster_path }} 
            resizeMode='contain'
            style={{
              height: 300,
              backgroundColor: 'white'
            }} 
          />
          <Title style={{ paddingVertical:5}}>{data.movie.title}</Title>
          <Paragraph style={{ paddingBottom:10}}>Popularity: {data.movie.popularity}</Paragraph>
          <Paragraph>{data.movie.overview}</Paragraph>
        </Card>
      </View>
    </ScrollView>
  )
}

export default DetailScreen