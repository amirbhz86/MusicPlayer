import React, { useEffect, useState } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import useComponent from './hooks'
import { PropsType } from './models'
import { CommonHeader, Text, MusicController } from 'components'
import { KEYS, strings, BasicColors, MainColors } from 'common'
import { ms, vs } from '../../helper/sizing'
import { useRedux } from 'hooks'

const Favorites = (props: PropsType) => {
  const { Get } = useRedux()
  const { navigation } = props
  const { isLighttheme, musicController } = Get().app
  const { containerView, contentContainer, noMusicContainer } = styles({
    BasicColors,
    ms,
    vs,
    isLighttheme,
  })
  const { renderMusic, list } = useComponent()

  const emptyMusic = () => {
    return (
      <View style={noMusicContainer}>
        <Text
          size={'large'}
          color={isLighttheme ? MainColors.summary : 'white'}
        >
          {strings.thereIsNoFavoriteMusic}
        </Text>
      </View>
    )
  }

  return (
    <View style={containerView}>
      <CommonHeader title={strings.favorites} hasBack={false} />
      <View style={contentContainer}>
        <FlatList
          data={list}
          renderItem={renderMusic}
          keyExtractor={(item: any) => item.id}
          ListEmptyComponent={emptyMusic}
        />
      </View>
      {musicController?.show && <MusicController navigation={navigation} />}
    </View>
  )
}

const styles = (props: any) => {
  const { BasicColors, ms, vs, isLighttheme } = props
  return StyleSheet.create({
    containerView: {
      flex: 1,
      backgroundColor: isLighttheme ? BasicColors.white : BasicColors.black,
    },
    contentContainer: {
      width: '100%',
      paddingHorizontal: ms(20),
    },
    noMusicContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: vs(150),
    },
  })
}

export default Favorites
