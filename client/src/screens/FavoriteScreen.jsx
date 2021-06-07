import React from 'react';
import { View, Text, ScrollView } from 'react-native'
import { favoritesVar } from '../graphql/variables'
import { useReactiveVar } from '@apollo/client'
import FavoriteCard from '../components/FavoriteCard';

const FavoriteScreen = () => {

  const favorites = useReactiveVar(favoritesVar)

  return(
    <>
      <ScrollView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
        {
          favorites.map(favorite => {
            return(
              <FavoriteCard
                key={favorite._id} 
                favorite={favorite} 
              />
            )
          })
        }
      </View>
      </ScrollView> 
    </>
  )
}

export default FavoriteScreen