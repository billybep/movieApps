import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider as PaperProvider } from 'react-native-paper'
import HomeScreen from './src/screens/HomeScreen'
import DetailScreen from './src/screens/DetailScreen'
import FavoriteScreen from './src/screens/FavoriteScreen'
import Icon from 'react-native-vector-icons/FontAwesome'
import { GET_FAVORITES } from './src/graphql/query'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const Home = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ title:'mu-Fee'}} /> 
      <Stack.Screen name='Detail' component={DetailScreen} /> 
    </Stack.Navigator>
  )
}

export default function App() {

  // const client = new ApolloClient({
  //   uri: 'http://10.0.2.2:4000',
  //   cache: new InMemoryCache()
  // })
  const client = new ApolloClient({
    uri: 'http://54.87.31.183:4000',
    cache: new InMemoryCache()
  })

  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name='Home'
              component={Home}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                  <Icon name="home" color={color} size={size} />
                ),
              }} 
            />
            <Tab.Screen
              name='Favorite'
              component={FavoriteScreen}
              options={{
                tabBarLabel: 'Favorite',
                tabBarIcon: ({ color, size }) => (
                  <Icon name="star" color={color} size={size} />
                ),
              }}  
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  );
}
