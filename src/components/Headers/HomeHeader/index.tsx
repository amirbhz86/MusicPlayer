import { MusicSVG, SearchSVG } from 'assets'
import { MainColors } from 'common'
import { PressableRadius, ToggleAnimated } from 'components'
import { vs } from 'helper'
import { useRedux } from 'hooks'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import useComponent from './hooks'
import { PropsType } from './models'
// import { debug } from 'tools/index'

const Header = (props: PropsType) => {
  const { containerView, musicContainer, searchWrapperStyle } = styles({
    MainColors,
  })
  const { title, style, navigation } = props
  const { Save, Get } = useRedux()
  const { isLighttheme } = Get().app

  const {} = useComponent()

  return (
    <View style={[containerView, style]}>
      <View style={musicContainer}>
        <ToggleAnimated
          centerTitle=""
          initialState={true}
          onPress={(value: boolean) => Save({ isLighttheme: !value }, 'app')}
        />
      </View>
      {/* <PressableRadius
        rippleBackgroundColor="black"
        wrapperStyle={musicContainer}>
        <MusicSVG />
      </PressableRadius> */}
      <PressableRadius
        onPress={() => {
          navigation.navigate('Search')
        }}
        rippleBackgroundColor="black"
        wrapperStyle={searchWrapperStyle}
      >
        <SearchSVG />
      </PressableRadius>
    </View>
  )
}

const styles = (props: any) => {
  const { MainColors } = props
  return StyleSheet.create({
    containerView: {
      position: 'absolute',
      top: 0,
      width: '100%',
      paddingHorizontal: vs(15),
      marginTop: vs(15),
      alignItems: 'center',
    },
    searchWrapperStyle: {
      width: 35,
      height: 35,
      borderRadius: 7,
      backgroundColor: MainColors.darkPrimary,
      position: 'absolute',
      right: '8.5%',
      zIndex: 1,
    },
    musicContainer: {
      width: 55,
      height: 30,
      borderRadius: 7,
      position: 'absolute',
      zIndex: 1,
      left: '8.5%',
      top: 0,
    },
  })
}

export default Header
