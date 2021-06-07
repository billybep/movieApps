import React from 'react'
import { Button, Card } from 'react-native-paper'
import { Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { favoritesVar } from '../graphql/variables'
import { useReactiveVar } from '@apollo/client'

const FavoriteCard = (props) => {
  
  const favorites = useReactiveVar(favoritesVar)

  const removeFavorite = (id) => {

    const newFav = favoritesVar()
    const removeFav = newFav.filter(fav => fav._id !== id)
    favoritesVar(removeFav)
    console.log('remove');
  }

  return (
    <>
      <Card style={{ maxHeight: 200, width: 300, marginVertical: 5 }}>
        <Card.Content>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Card.Cover 
                source={{ uri: props.favorite.poster_path }}
                style={{
                  maxHeight: 170,
                  width: 100
                }}
              />
            </View>
            <View style={{ paddingHorizontal: 15, maxWidth: 190 }}>
              <Text style={{ maxHeight: 70}}>{props.favorite.title}</Text>
              <Text style={{ marginTop: 5}}>Popularity: {props.favorite.popularity}</Text>
              <Card.Actions style={{ marginTop: 70, marginLeft: 61 }}>
                <Button onPress={ _ => removeFavorite(props.favorite._id) }>remove</Button>
              </Card.Actions>
            </View>
          </View>
          </Card.Content>
      </Card>
    </>
  )
}

export default FavoriteCard