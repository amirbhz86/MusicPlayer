import React from 'react'
import { View, StyleSheet } from 'react-native'
import useComponent from './hooks'
import { PropsType } from './models'
import { PressableRadius, Text } from 'components'
import { BasicColors, MainColors, strings, windowW } from 'common'
import {
  FavoriteSVG,
  HomeSVG,
  PlayListSVG,
  PlayListPinkSVG,
  PlayListsSVG,
  PinkPlayListsSVG,
  FavoritesPinkSVG,
  NormalHomeSVG,
  PinkSearchSVG,
  BrownSearchSVG,
  LightSearchSVG,
  LightPinkSearchSVG,
  LightHomePurpleSVG,
  LightHomeWhiteSVG,
  LightPlaylistsWhiteSVG,
  LightPlaylistsPurpleSVG,
  LightFavoritePurpleSVG,
  LightHeartSVG,
} from 'assets'
import { useRedux } from 'hooks'

const BottomTabbar = (props: PropsType) => {
  const { navigation } = props
  const { Save, Get } = useRedux()
  const { tabSelected, isLighttheme } = Get().app
  const { handleNavigate } = useComponent({ navigation })
  const { containerView } = styles({ isLighttheme })

  const selectedTitleColor = isLighttheme
    ? MainColors.secondry
    : MainColors.pink
  const unSelectedTitleColor = isLighttheme
    ? BasicColors.white
    : MainColors.darkText
  const searchUnselectedImage = isLighttheme ? (
    <LightSearchSVG />
  ) : (
    <BrownSearchSVG width={25} height={25} />
  )
  const searchSelectedImage = isLighttheme ? (
    <LightPinkSearchSVG />
  ) : (
    <PinkSearchSVG width={25} height={25} />
  )
  const homeSelectedImage = isLighttheme ? <LightHomePurpleSVG /> : <HomeSVG />
  const homeUnselectedImage = isLighttheme ? (
    <LightHomeWhiteSVG />
  ) : (
    <NormalHomeSVG />
  )
  const playlistsUnselectedImage = isLighttheme ? (
    <LightPlaylistsWhiteSVG />
  ) : (
    <PlayListsSVG width={29} height={29} />
  )
  const playlistsSelectedImage = isLighttheme ? (
    <LightPlaylistsPurpleSVG />
  ) : (
    <PinkPlayListsSVG width={29} height={29} />
  )
  const favoriteSelectedImage = isLighttheme ? (
    <LightFavoritePurpleSVG />
  ) : (
    <FavoritesPinkSVG />
  )
  const favoriteUnselectedImage = isLighttheme ? (
    <LightHeartSVG />
  ) : (
    <FavoriteSVG />
  )
  return (
    <View style={containerView}>
      <PressableRadius
        onPress={() => handleNavigate('Home')}
        wrapperStyle={{ width: 80, height: 50, borderRadius: 25 }}
      >
        {tabSelected == 'Home' ? homeSelectedImage : homeUnselectedImage}
        <Text
          size="xSmall"
          color={
            tabSelected !== 'Home' ? unSelectedTitleColor : selectedTitleColor
          }
          style={{ marginTop: 4 }}
        >
          {strings.home}
        </Text>
      </PressableRadius>
      <PressableRadius
        onPress={() => handleNavigate('Search')}
        wrapperStyle={{ width: 80, height: 50, borderRadius: 25 }}
      >
        {tabSelected == 'Search' ? searchSelectedImage : searchUnselectedImage}
        <Text
          size="xSmall"
          color={
            tabSelected !== 'Search' ? unSelectedTitleColor : selectedTitleColor
          }
          style={{ marginTop: 4 }}
        >
          {strings.search}
        </Text>
      </PressableRadius>
      <PressableRadius
        onPress={() => handleNavigate('PlayList')}
        wrapperStyle={{ width: 80, height: 50, borderRadius: 25 }}
      >
        {tabSelected == 'PlayList'
          ? playlistsSelectedImage
          : playlistsUnselectedImage}
        <Text
          size="xSmall"
          color={
            tabSelected !== 'PlayList'
              ? unSelectedTitleColor
              : selectedTitleColor
          }
          style={{ marginTop: 4 }}
        >
          {strings.playlist}
        </Text>
      </PressableRadius>
      <PressableRadius
        onPress={() => handleNavigate('Favorites')}
        wrapperStyle={{ width: 80, height: 50, borderRadius: 25 }}
      >
        {tabSelected == 'Favorites'
          ? favoriteSelectedImage
          : favoriteUnselectedImage}
        <Text
          color={
            tabSelected !== 'Favorites'
              ? unSelectedTitleColor
              : selectedTitleColor
          }
          style={{ marginTop: 4 }}
        >
          {strings.favorites}
        </Text>
      </PressableRadius>
    </View>
  )
}

const styles = (props: any) => {
  const { isLighttheme } = props
  return StyleSheet.create({
    containerView: {
      width: '100%',
      height: 60,
      backgroundColor: isLighttheme
        ? MainColors.lightBottomTabbar
        : MainColors.darkBrown,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
  })
}

export default BottomTabbar
