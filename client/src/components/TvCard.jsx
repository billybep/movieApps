import React from 'react'
import { Button, Card, Title } from 'react-native-paper'
import { Text, View, ScrollView } from 'react-native'

const TvCard = (props) => {

  return (
    <>
      <Card style={{ maxHeight: 200, width: 300, marginTop: 10, marginHorizontal: 5 }}>
        <Card.Content>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Card.Cover 
                source={{ uri: props.tvSerie.poster_path }}
                style={{
                  maxHeight: 170,
                  width: 100
                }}
              />
            </View>
            <View style={{ paddingHorizontal: 15, maxWidth: 190 }}>
                <ScrollView>
              <Text style={{ maxHeight: 70}}>{props.tvSerie.title}</Text>
              <Text style={{ marginTop: 5}}>Popularity: {props.tvSerie.popularity}</Text>
                  <Text style={{ marginTop: 5}}>Overview: {props.tvSerie.overview}</Text>
              <Card.Actions style={{ marginTop: 70, marginLeft: 61 }}>
                {/* <Button>remove</Button> */}
              </Card.Actions>
                </ScrollView>
            </View>
          </View>
          </Card.Content>
      </Card>
    </>
  )
}

export default TvCard