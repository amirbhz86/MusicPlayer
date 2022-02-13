import { Favorites, Playlists, Music, MusicPlayer, Search } from 'screens'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { BottomTabbar } from 'components'
import { useRedux } from 'hooks'
import React from 'react'

const BottomTabNavigator = () => {
  const { Get } = useRedux()
  const { tabSelected } = Get().app
  const Tab = createBottomTabNavigator()
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props: any) => <BottomTabbar {...props} />}
        initialRouteName={tabSelected}
      >
        <Tab.Screen name="Favorites" component={Favorites} />
        <Tab.Screen name="PlayList" component={Playlists} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Home" component={HomeStack} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const HomeStack = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={'Home'}
    >
      <Stack.Screen name="MusicPlayer" component={MusicPlayer} />
      <Stack.Screen name="Home" component={Music} />
    </Stack.Navigator>
  )
}

export default BottomTabNavigator
