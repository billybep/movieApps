import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { Text, Card, Dialog, Paragraph, Portal, Button, TextInput } from 'react-native-paper'
import { ScrollView } from 'react-native'
import { favoritesVar } from '../graphql/variables'
import { GET_MOVIES } from '../graphql/query'

const ContentCard = (props) => {
  
  const [visibleForm, setVisibleForm] = React.useState(false)

  const showDialog = () => setVisibleForm(true) 
  const hideDialog = () => setVisibleForm(false)

  const [title, setTitle] = React.useState(props.movie.title)
  const [overview, setOverview] = React.useState(props.movie.overview)
  const [poster_path, setPosterPath] = React.useState(props.movie.poster_path)
  const [popularity, setPopularity] = React.useState(props.movie.popularity)
  const [tags, setTag] = React.useState(props.movie.tags.toString())
  
  const UPDATE_MOVIE = gql`
    mutation UPDATE_MOVIE($input: dataMovie) {
      updateMovie(updateMovie: $input _id: "${props.movie._id}") {
        message
      }
    }
  `
  const [updateMovie] = useMutation(UPDATE_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }]
  })

  const DELETE_MOVIE = gql`
    mutation deleteMovie {
      deleteMovie(_id: "${props.movie._id}") {
        title
      }
    }
  `
  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }]
  })
  
  const DeleteMovie = _ => {
    console.log('Delete Movie', props.movie._id)
    deleteMovie()
  }

  const updateMovieOnPress = id => {
    let updatedData = {}
    let newTags = []
    console.log('uppp lahh')

    if (tags.includes(',')) newTags = tags.split(',')
    else newTag = [tags]

    updatedData = {
      title,
      overview,
      poster_path,
      popularity,
      tags : newTags
    }

    console.log(updatedData,'for update');
    updateMovie({ variables: { input: updatedData }})
    hideDialog()
  }

  const addFavorite = _ => {
    const favorites = favoritesVar()
    const newFavorites = [props.movie, ...favorites]
    favoritesVar(newFavorites)

    console.log('Favorite klik', newFavorites)
  }

  return(
    <>
      <Card 
        elevation={0}
        style={{ 
          margin: 3,
          marginTop: 0,
          maxHeight: 350,
          width: 325
        }}>
        <Text style={{textAlign: 'center', paddingVertical: 5}}>{props.movie.title}</Text>
        <Card.Content>
          <Card.Cover 
            source={{ uri: props.movie.poster_path }}
            resizeMode='contain'
          />
          <Button 
            icon="heart" 
            mode="outlined" 
            onPress={() => { addFavorite() }}
          >
            Favorite
          </Button>
          <Button 
            icon="pen" 
            mode="outlined" 
            onPress={() => { console.log('update'), showDialog() }}
          >
            Edit
          </Button>
          <Button 
            icon="delete" 
            mode="outlined" 
            onPress={ _ => { DeleteMovie() }}
          >
            Delete 
          </Button>
        </Card.Content>
      </Card>
      
      <Portal>
        <Dialog visible={visibleForm} onDismiss={hideDialog}>
          <Dialog.Title>Edit Movie</Dialog.Title>
          <ScrollView>
            <Dialog.Content>
              <Paragraph>Update data movie here</Paragraph>
              <TextInput
                type="flat"
                value={title}
                onChangeText={ text => setTitle(text) }
              />
              <TextInput
                multiline
                numberOfLines={2}
                type="flat"
                value={overview}
                onChangeText={ text => setOverview(text) }
              />
              <TextInput
                multiline
                numberOfLines={2}
                label="Poster Path" 
                type="flat"
                value={poster_path}
                onChangeText={ text => setPosterPath(text) }
              />
              <TextInput
                type="flat"
                keyboardType="numeric"
                value={popularity.toString()}
                onChangeText={ text => setPopularity(text) }
              />
              <TextInput
                type="flat"
                value={tags.replace(',', ' ')}
                onChangeText={ text => setTag(text) }
              />
            </Dialog.Content>
            </ScrollView>
            <Dialog.Actions>
              <Button onPress={ hideDialog }>Cancel</Button>
              <Button onPress={ _ => updateMovieOnPress() }>Update</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
    </>
  )
}

export default ContentCard