import {
  CircleBackSVG,
  PinkAddSVG,
  SearchSVG,
  LightCircleBackSVG,
} from 'assets'
import { BasicColors, MainColors, strings } from 'common'
import { PressableRadius, Text } from 'components'
import { vs } from 'helper'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import useComponent from './hooks'
import { PropsType } from './models'
import { useRedux } from 'hooks'

const Header = (props: PropsType) => {
  const {
    containerView,
    titleContainer,
    searchWrapperStyle,
    newPlaylistContent,
  } = styles({})
  const {
    title,
    style,
    rightIcon = 'Nothing',
    navigation,
    rightIconPress,
    onBack,
    hasBack = true,
  } = props
  const { searchOnPress } = useComponent({ ...props })
  const { Get } = useRedux()
  const { isLighttheme } = Get().app

  const renderRightIcon = () => {
    switch (rightIcon) {
      case 'NewPlaylist':
        return (
          <PressableRadius
            onPress={rightIconPress}
            wrapperStyle={{ height: 40, borderRadius: 8 }}
          >
            <View style={newPlaylistContent}>
              <PinkAddSVG color={isLighttheme ? '#53219F' : '#fe5ab2'} />
              <Text
                size="xSmall"
                style={{ marginLeft: 10 }}
                color={isLighttheme ? MainColors.secondry : MainColors.pink}
              >
                {strings.newPlaylist}
              </Text>
            </View>
          </PressableRadius>
        )
      case 'Nothing':
        return <></>
      case 'Search':
        return (
          <PressableRadius
            onPress={searchOnPress}
            wrapperStyle={searchWrapperStyle}
          >
            <SearchSVG />
          </PressableRadius>
        )
      case 'ThreeDot':
        return <></>
      default:
        return <></>
    }
  }

  return (
    <View style={[containerView, style]}>
      <View style={titleContainer}>
        {hasBack && (
          <PressableRadius
            wrapperStyle={{ marginLeft: 0, borderRadius: 22.5 }}
            onPress={onBack ? onBack : () => navigation.goBack()}
          >
            <CircleBackSVG
              color={isLighttheme ? MainColors.summary : '#fff'}
              width={27}
              height={29}
            />
          </PressableRadius>
        )}
        <Text
          size="heading"
          color={isLighttheme ? MainColors.primary : BasicColors.white}
        >
          {title}
        </Text>
      </View>
      <PressableRadius wrapperStyle={{ borderRadius: 8, top: 15 }}>
        {renderRightIcon()}
      </PressableRadius>
    </View>
  )
}
const styles = (props: any) => {
  return StyleSheet.create({
    containerView: {
      width: '100%',
      marginTop: vs(10),
      paddingHorizontal: '7.5%',
      flexDirection: 'row',
      alignItems: 'flex-end',
      height: 40,
      justifyContent: 'space-between',
    },
    newPlaylistContent: {
      width: '100%',
      height: '100%',
      flexDirection: 'row',
    },
    backgroundContentView: {},
    searchWrapperStyle: {
      width: 35,
      height: 35,
      borderRadius: 7,
      backgroundColor: MainColors.darkPrimary,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  })
}

export default Header
