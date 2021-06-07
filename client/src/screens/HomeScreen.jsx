import React from 'react'
import { StyleSheet, ScrollView, View, Text, Pressable } from 'react-native'
import { FAB, Dialog, Paragraph, Portal, Button, TextInput } from 'react-native-paper'
import { StatusBar } from 'expo-status-bar'
import { useQuery, useMutation } from '@apollo/client'
import { GET_MOVIES, ADD_MOVIE } from '../graphql/query'
import ContentCard from '../components/ContentCard'
import TvCard from '../components/TvCard'

const HomeScreen = ({ navigation }) => {
  const [visibleFormMovie, setVisibleFormMovie] = React.useState(false)
  const showDialogAddMovie = _ => setVisibleFormMovie(true)
  const hideDialogAddMovie = _ => setVisibleFormMovie(false)

  const [title, setTitle] = React.useState('')
  const [overview, setOverview] = React.useState('')
  const [poster_path, setPosterPath] = React.useState('')
  const [popularity, setPopularity] = React.useState('')
  const [tags, setTag] = React.useState('')

  const [addMovie] = useMutation(ADD_MOVIE, {
    refetchQueries: [{
      query: GET_MOVIES
    }]
  })

  const { loading, error, data } = useQuery(GET_MOVIES)
  if (loading) return <Text>Loading ...</Text>
  if (error) return <Text>Error ... </Text>

  const toDetail = (_id) => {
    console.log('click', _id)
    navigation.navigate('Detail', { _id })
  }

  const addMovieOnPress = () => {
    let dataMovie = {}
    let newTag = []

    if (tags.includes(' ')) newTag = tags.split(' ')
    else newTag = [tags]

    dataMovie = {
      title,
      overview,
      poster_path,
      popularity : Number(popularity),
      tags : newTag
    }

    addMovie({ variables: { input: dataMovie} })
    setTitle('')
    setOverview('')
    setPosterPath('')
    setPopularity('')
    setTag('')
    hideDialogAddMovie()
  }

  return(
    <>
      <Text 
        style={{ 
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 'bold',
          // marginTop: 10,
          paddingBottom: 5,
          backgroundColor: 'white' 
        }}>
          Movie
        </Text>
      <ScrollView style={styles.container}>
        <ScrollView horizontal={true}>
          <View style={{ flexDirection: 'row' }}>
            {
              data?.movies.map(movie => {
                return(
                  <Pressable
                    key={movie._id} 
                    onPress={ _ => toDetail(movie._id)}
                  >
                    <ContentCard movie={movie} />
                  </Pressable>
                )
              })
            }
          </View>
        </ScrollView>
        <ScrollView horizontal={true}>
          <View style={{ flexDirection: 'row' }}>
            {
              data?.tvSeries.map(tvSerie => {
                return(
                  <View 
                    key={tvSerie._id} 
                    onPress={ _ => toDetail(tvSerie._id)}
                  >
                    <TvCard tvSerie={tvSerie} />
                  </View>
                )
              })
            }
          </View>
        </ScrollView>
      </ScrollView>
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => showDialogAddMovie()}
      />
      
        <Portal>
          <Dialog visible={visibleFormMovie} onDismiss={hideDialogAddMovie}>
            <Dialog.Title>Add Movie</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Input new data movie here</Paragraph>
              <TextInput
                label="Title" 
                type="flat"
                value={title}
                onChangeText={ text => setTitle(text)}
              />
              <TextInput
                label="Overview" 
                type="flat"
                value={overview}
                onChangeText={ text => setOverview(text)}
              />
              <TextInput
                label="Poster Path" 
                type="flat"
                value={poster_path}
                onChangeText={ text => setPosterPath(text)}
              />
              <TextInput
                label="Popularity" 
                type="flat"
                keyboardType="numeric"
                value={popularity}
                onChangeText={ text => setPopularity(text)}
              />
              <TextInput
                label="Tags"
                type="flat"
                value={tags}
                onChangeText={ text => setTag(text)}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={ hideDialogAddMovie }>Cancel</Button>
              <Button onPress={ _ => addMovieOnPress() }>Add</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
})

export default HomeScreen