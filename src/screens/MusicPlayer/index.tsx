import Slider from '@react-native-community/slider'
import {
  HeartSVG,
  LightNextSVG,
  LightPreviousSVG,
  LightRepeatSVG,
  PauseSVG,
  PinkHeartSVG,
  PinkRepeatSVG,
  PlaySVG,
  WhiteRepeatSVG,
  LightNoRepeatSVG,
} from 'assets'
import { BasicColors, MainColors, windowW } from 'common'
import { CommonHeader, PressableRadius, Text } from 'components'
import { vs } from 'helper'
import { useRedux } from 'hooks'
import React, { useEffect, useRef } from 'react'
import { Animated, Image, StyleSheet, View, FlatList } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player'
import useComponent from './hooks'
import { PropsType } from './models'

const MusicPlayer = (props: PropsType) => {
  let { route, navigation } = props
  const { Get, Save } = useRedux()
  const { playedMusicId, musicController, playingMusics, isLighttheme } =
    Get().app
  const playbackState = usePlaybackState()
  let pressedIdVar = route.params.pressedId
  let songIndexPassed = route.params.songIndex
  let musicArray = route.params.passedData

  const scrollX = useRef(new Animated.Value(0)).current
  const progress = useProgress()
  const {
    containerView,
    artworkWrapper,
    artworkImage,
    artistText,
    titleText,
    progressContainer,
    progressLabelContainer,
    progressLabelTxt,
    backgroundImage,
    backgroundLayerView,
    musicButtonsContainer,
    imagesFlatListContainer,
    toolsContainer,
    playWrapperStyle,
    playInnerStyle,
    prevImage,
    bottomToolsContainer,
    repeatWrapperStyle,
    topHeader,
  } = styles({ isLighttheme })
  const {
    pressedId,
    setPressedId,
    songIndex,
    isMusicLoaded,
    setSongIndex,
    setIsMusicLoaded,
    initialIndexMusic,
    isFavorite,
    showSelectedSong,
    favoriteMusic,
    skipToNextSlide,
    skipToPreviousSlide,
    togglePlayback,
    setRepeatMode,
    repeatMode,
    changeRepeatMode,
    setIsSeeking,
    seek,
    setSeek,
    isSeeking,
    songSliderRefVar,
  } = useComponent({ ...props })
  let isPlaying = playingMusics[songIndex].id == playedMusicId

  const repeatModeImage = isLighttheme ? (
    <LightRepeatSVG color="red" width={25} height={25} />
  ) : (
    <PinkRepeatSVG width={25} height={25} />
  )
  const noRepeatModeImage = isLighttheme ? (
    <LightNoRepeatSVG width={25} height={25} />
  ) : (
    <WhiteRepeatSVG width={25} height={25} />
  )

  function fancyTimeFormat(duration: number) {
    if (!duration) {
      return '00:00'
    }
    // Hours, minutes and seconds
    var hrs = Math.floor(duration / 3600)
    var mins = Math.floor((duration % 3600) / 60)
    var secs = Math.floor(duration % 60)

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = ''

    if (hrs > 0) {
      ret += '' + hrs + ':' + (mins < 10 ? '0' : '')
    }

    ret += '' + mins + ':' + (secs < 10 ? '0' : '')
    ret += '' + secs
    return ret
  }

  useEffect(() => {
    if (progress.position < 1.5) {
      setIsMusicLoaded(true)
      // removing delay of music loading
    }
    if (Math.abs(progress.position - seek) < 0.9 && isSeeking) {
      setIsSeeking(false)
      // removing delay of seeking
    }
  }, [progress.position])

  useEffect(() => {
    showSelectedSong()
    // this handles changing songIndex while scrolling between items
    scrollX.addListener(({ value }) => {
      const index = Math.round(value / windowW)
      setSongIndex(index)
    })
    return () => {
      scrollX.removeAllListeners()
    }
  }, [])

  const renderSongs = ({ item, index }: any) => {
    const { artwork } = item

    return (
      <Animated.View
        style={{
          width: windowW,
          justifyContent: 'center',
          height: vs(480),
          alignItems: 'center',
        }}
      >
        <Image style={backgroundImage} source={{ uri: artwork }} />
        <LinearGradient
          start={{ x: 0.5, y: 0.4 }}
          end={{ x: 0.5, y: 0.7 }}
          colors={
            isLighttheme
              ? ['rgba(255, 255, 255, 0.7 )', 'rgba(255, 255, 255, 1)']
              : ['rgba(0, 0, 0, 0.7 )', 'rgba(0, 0, 0, 1)']
          }
          style={backgroundLayerView}
        />
        <View style={artworkWrapper}>
          <Image source={{ uri: artwork }} style={artworkImage} />
        </View>
      </Animated.View>
    )
  }

  return (
    <View style={containerView}>
      <CommonHeader navigation={navigation} style={topHeader} />
      <View style={imagesFlatListContainer}>
        <Animated.FlatList
          initialScrollIndex={initialIndexMusic}
          onScrollToIndexFailed={(info) => {
            const wait = new Promise((resolve) => setTimeout(resolve, 500))
            wait.then(() => {
              songSliderRefVar.current?.scrollToIndex({
                index: info.index,
                animated: true,
              })
            })
          }}
          ref={songSliderRefVar}
          getItemLayout={(data, index) => ({
            length: windowW,
            offset: windowW * index,
            index,
          })}
          data={musicArray}
          keyExtractor={(item) => item.id}
          renderItem={renderSongs}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x: scrollX },
                },
              },
            ],
            { useNativeDriver: true },
          )}
        />
      </View>
      <View style={musicButtonsContainer}>
        <Text
          size="headingTitle"
          color={isLighttheme ? MainColors.summary : BasicColors.white}
          style={titleText}
        >
          {musicArray[songIndex].name}
        </Text>
        <View>
          <Slider
            maximumValue={progress.duration}
            thumbTintColor={MainColors.pink}
            minimumTrackTintColor={BasicColors.pink}
            maximumTrackTintColor={
              isLighttheme ? MainColors.lightPrimary : '#FFF'
            }
            onSlidingComplete={async (value) => {
              await TrackPlayer.seekTo(value)
              if (playedMusicId) {
                await TrackPlayer.play()
              }
            }}
            onValueChange={async (value) => {
              setIsSeeking(true)
              setSeek(value)
              TrackPlayer.pause()
            }}
            style={progressContainer}
            value={
              isMusicLoaded && playingMusics[songIndex].id == playedMusicId
                ? isSeeking
                  ? seek
                  : progress.position
                : 0
            }
            minimumValue={0}
          />
          <View style={progressLabelContainer}>
            <Text
              color={isLighttheme ? MainColors.summary : '#fff'}
              style={progressLabelTxt}
            >
              {isPlaying && isMusicLoaded
                ? fancyTimeFormat(progress.position)
                : '00:00'}
            </Text>
            {progress.duration !== 0 && (
              <Text
                color={isLighttheme ? MainColors.summary : '#fff'}
                style={progressLabelTxt}
              >
                {isPlaying && isMusicLoaded
                  ? fancyTimeFormat(progress.duration - progress.position)
                  : !isMusicLoaded && isPlaying
                  ? fancyTimeFormat(progress.duration - 0)
                  : playingMusics !== undefined
                  ? fancyTimeFormat(playingMusics[songIndex].duration - 0)
                  : ''}
              </Text>
            )}
            {progress.duration == 0 &&
              isPlaying &&
              playbackState == State.Playing && (
                <Text
                  type="bold"
                  style={{ top: -5, left: -2 }}
                  size="large"
                  color={'red'}
                >
                  {'Live'}
                </Text>
              )}
            {progress.duration == 0 &&
              !isPlaying &&
              playbackState == State.Playing && <Text>{'00:00'}</Text>}
          </View>
          <View style={[toolsContainer]}>
            <PressableRadius
              onPress={() => skipToPreviousSlide()}
              wrapperStyle={{ width: 50, height: 50 }}
            >
              {isLighttheme ? (
                <LightPreviousSVG />
              ) : (
                <Image
                  style={prevImage}
                  source={require('assets/icons/prevMusic.png')}
                />
              )}
            </PressableRadius>
            <PressableRadius
              wrapperStyle={playWrapperStyle}
              innerStyle={playInnerStyle}
              onPress={() => togglePlayback()}
            >
              {isPlaying && playbackState !== State.Paused ? (
                <PauseSVG />
              ) : (
                <PlaySVG width={25} height={25} style={{ left: 3 }} />
              )}
            </PressableRadius>
            <PressableRadius
              onPress={() => skipToNextSlide()}
              innerStyle={{ width: 50, height: 50 }}
              wrapperStyle={{ width: 50, height: 50 }}
            >
              {isLighttheme ? (
                <LightNextSVG />
              ) : (
                <Image
                  style={prevImage}
                  source={require('assets/icons/nextMusic.png')}
                />
              )}
            </PressableRadius>
          </View>
          <View style={bottomToolsContainer}>
            <PressableRadius
              onPress={changeRepeatMode}
              wrapperStyle={repeatWrapperStyle}
            >
              {repeatMode == 'repeatTrack' && repeatModeImage}
              {repeatMode == 'nextMusic' && noRepeatModeImage}
            </PressableRadius>
            <PressableRadius onPress={favoriteMusic}>
              {isFavorite ? (
                <PinkHeartSVG width={35} height={35} />
              ) : (
                <HeartSVG width={35} height={35} />
              )}
            </PressableRadius>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = (props: any) => {
  const { isLighttheme } = props
  return StyleSheet.create({
    containerView: {
      flex: 1,
      backgroundColor: isLighttheme ? BasicColors.white : BasicColors.black,
      justifyContent: 'flex-start',
      flexDirection: 'column',
    },
    bottomToolsContainer: {
      height: 50,
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: windowW * 0.1,
      marginTop: vs(-3),
    },
    topHeader: {
      position: 'absolute',
      zIndex: 2000,
    },
    repeatWrapperStyle: {},
    backgroundImage: {
      width: windowW,
      backgroundColor: 'green',
      height: vs(480),
      resizeMode: 'cover',
      position: 'absolute',
      zIndex: 2000,
    },
    playWrapperStyle: {
      width: vs(83),
      height: vs(83),
      borderRadius: vs(41),
      backgroundColor: MainColors.secondry,
      alignSelf: 'center',
    },
    playInnerStyle: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    prevImage: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
    },
    backgroundLayerView: {
      width: windowW,
      height: vs(480),
      position: 'absolute',
      zIndex: 3000,
    },
    toolsContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: windowW * 0.25,
      marginTop: vs(20),
    },
    progressLabelContainer: {
      width: '100%',
      paddingHorizontal: windowW * 0.07,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    progressLabelTxt: {},
    artworkWrapper: {
      width: vs(300),
      height: vs(300),
      marginBottom: 25,
      shadowColor: '#ccc',
      shadowOffset: {
        width: 5,
        height: 5,
      },
      shadowOpacity: 0.5,
      shadowRadius: 3.84,
      elevation: 5,
    },
    progressContainer: {
      width: windowW * 0.9,
      alignSelf: 'center',
      height: 40,
      marginTop: 25,
      flexDirection: 'row',
    },
    imagesFlatListContainer: {
      height: vs(480),
    },
    musicButtonsContainer: {
      width: '100%',
      marginTop: -windowW * 0.1,
      flex: 1,
    },
    artworkImage: {
      width: '100%',
      height: '100%',
      borderRadius: 15,
    },
    artistText: {},
    titleText: {
      fontWeight: '600',
      textAlign: 'center',
      alignSelf: 'center',
    },
  })
}

export default MusicPlayer
