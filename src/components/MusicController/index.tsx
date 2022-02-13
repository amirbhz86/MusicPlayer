import Slider from '@react-native-community/slider'
import {
  CloseSVG,
  LightNextSVG,
  LightNoRepeatSVG,
  LightPreviousSVG,
  LightRepeatSVG,
  PauseSVG,
  PinkRepeatSVG,
  PlaySVG,
  WhiteRepeatSVG,
} from 'assets'
import { BasicColors, MainColors, windowW } from 'common'
import { PressableRadius, Text } from 'components'
import { useMusicPlayer, useRedux } from 'hooks'
import React, { useEffect } from 'react'
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native'
import TrackPlayer, {
  usePlaybackState,
  useProgress,
} from 'react-native-track-player'
import { URL } from '../../api/api'
import useComponent from './hooks'
import { PropsType } from './models'

const MusicController = (props: PropsType) => {
  const { navigation } = props
  const { Get } = useRedux()
  const { playedMusicId, musicController, isLighttheme, playingMusics } =
    Get().app
  const {
    containerView,
    musicImage,
    leftPart,
    nameView,
    musicTools,
    prevImage,
    nextImage,
    rightPart,
    nextWrapperStyle,
    pauseWrapperStyle,
    prevWrapperStyle,
    progressContainer,
    sliderAndToolsView,
    threeDotStyle,
    repeatWrapperStyle,
  } = styles({ windowW, isLighttheme })
  const progress = useProgress()
  const {
    removeMusicController,
    togglePlayback,
    repeatMode,
    changeRepeatMode,
  } = useComponent()
  const { skipToPreviousMusic, skipToNextMusic } = useMusicPlayer({})

  const musicOnpress = () => {
    navigation.navigate('MusicPlayer', {
      passedData: playingMusics,
      songIndex: musicController?.index,
      pressedId:
        Number(musicController.id) + 50 * Math.floor(Math.random() * 1000),
    })
  }

  const repeatSelectedImage = isLighttheme ? (
    <LightRepeatSVG />
  ) : (
    <PinkRepeatSVG width={20} height={20} />
  )
  const repeatUnSelectedImage = isLighttheme ? (
    <LightNoRepeatSVG />
  ) : (
    <WhiteRepeatSVG width={20} height={20} />
  )
  return (
    <View style={containerView}>
      <TouchableOpacity onPress={musicOnpress} style={leftPart}>
        <Image source={{ uri: musicController?.artwork }} style={musicImage} />
        <View style={nameView}>
          <Text
            color={isLighttheme ? MainColors.summary : BasicColors.white}
            size="small"
            style={{ width: 65, flexWrap: 'wrap' }}
            numberOfLines={2}
            type="bold"
          >
            {musicController?.musicName}
          </Text>
          {false && (
            <Text
              color={isLighttheme ? MainColors.summary : BasicColors.white}
              size="xxSmall"
              style={{ marginTop: 7 }}
            >
              {'Star Boy'}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <View style={sliderAndToolsView}>
        <View style={musicTools}>
          <PressableRadius
            onPress={skipToPreviousMusic}
            wrapperStyle={prevWrapperStyle}
          >
            {isLighttheme ? (
              <LightPreviousSVG width={18} height={18} />
            ) : (
              <Image
                style={prevImage}
                source={require('assets/icons/prevMusic.png')}
              />
            )}
          </PressableRadius>
          <PressableRadius
            onPress={togglePlayback}
            wrapperStyle={pauseWrapperStyle}
          >
            {playedMusicId ? (
              <PauseSVG
                color={isLighttheme ? '#3d098b' : '#fff'}
                style={{ marginHorizontal: 0 }}
              />
            ) : (
              <PlaySVG
                width={22}
                height={23}
                color={isLighttheme ? '#3d098b' : '#fff'}
                style={{ left: 4, top: 1 }}
              />
            )}
          </PressableRadius>
          <PressableRadius
            onPress={skipToNextMusic}
            wrapperStyle={nextWrapperStyle}
          >
            {isLighttheme ? (
              <LightNextSVG />
            ) : (
              <Image
                style={nextImage}
                source={require('assets/icons/nextMusic.png')}
              />
            )}
          </PressableRadius>
        </View>
        <Slider
          maximumValue={progress.duration}
          thumbTintColor={BasicColors.pink}
          minimumTrackTintColor={BasicColors.pink}
          maximumTrackTintColor={isLighttheme ? MainColors.summary : '#FFF'}
          onSlidingComplete={async (value) => {
            await TrackPlayer.seekTo(value)
          }}
          style={progressContainer}
          value={progress.position}
          minimumValue={0}
        />
      </View>
      <View style={rightPart}>
        <PressableRadius
          onPress={changeRepeatMode}
          wrapperStyle={[repeatWrapperStyle, { marginRight: 3 }]}
        >
          {repeatMode == 'repeatTrack' && repeatSelectedImage}
          {repeatMode == 'nextMusic' && repeatUnSelectedImage}
        </PressableRadius>
        <PressableRadius
          onPress={removeMusicController}
          wrapperStyle={threeDotStyle}
        >
          <CloseSVG
            color={isLighttheme ? '#3d098b' : BasicColors.white}
            width={15}
            height={15}
            style={{ marginRight: -4 }}
          />
        </PressableRadius>
      </View>
    </View>
  )
}

const styles = (props: any) => {
  const { windowW, isLighttheme } = props
  return StyleSheet.create({
    containerView: {
      width: '100%',
      height: 70,
      backgroundColor: isLighttheme ? '#efecf3' : BasicColors.brown,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      paddingLeft: 10,
    },
    rightPart: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      marginLeft: -5,
    },
    prevImage: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
    },
    progressContainer: {
      width: windowW - 180,
      justifyContent: 'center',
      alignSelf: 'center',
      flexDirection: 'row',
    },
    nextWrapperStyle: {
      width: 35,
      height: 35,
      borderRadius: 10,
    },
    repeatWrapperStyle: {
      width: 35,
      height: 35,
      borderRadius: 10,
    },
    threeDotStyle: {
      width: 35,
      height: 35,
      borderRadius: 10,
      marginLeft: -4,
    },
    pauseWrapperStyle: {
      width: 35,
      height: 35,
      borderRadius: 10,
    },
    prevWrapperStyle: {
      width: 35,
      height: 35,
      borderRadius: 10,
    },
    sliderAndToolsView: {
      // backgroundColor : 'red' ,
      marginLeft: -20,
      alignSelf: 'center',
      justifyContent: 'center',
      // justifyContent  : 'flex-start' ,
      // backgroundColor : 'red' ,
    },
    nextImage: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
    },
    musicTools: {
      // backgroundColor : "blue" ,
      // alignSelf : 'flex-start' ,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },
    nameView: {
      marginLeft: 6,
    },
    musicImage: {
      width: 40,
      height: 40,
      borderRadius: 7,
      backgroundColor: 'white',
    },
    leftPart: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  })
}

export default MusicController
