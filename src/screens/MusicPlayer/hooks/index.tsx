import AsyncStorage from '@react-native-async-storage/async-storage'
import { KEYS } from 'common'
import { useMusicPlayer, useRedux } from 'hooks'
import { useEffect, useRef, useState } from 'react'
import { FlatList } from 'react-native'
import TrackPlayer, { RepeatMode } from 'react-native-track-player'
import { HookPropsType } from '../models'

export const useComponent = (props: HookPropsType) => {
  const songSliderRefVar = useRef<FlatList>(null)
  let { route, songSliderRef, navigation } = props
  let songIndexPassed = route.params.songIndex
  let musicArray = route.params.passedData
  let pressedIdVar = route.params.pressedId
  const [pressedId, setPressedId] = useState<any>(pressedIdVar)
  const [isSeeking, setIsSeeking] = useState(false)
  const [seek, setSeek] = useState(0)
  const [repeatMode, setRepeatMode] = useState<
    'nextMusic' | 'off' | 'repeatTrack'
  >('off')
  const {
    setSongIndex,
    skipToPreviousSlide,
    togglePlayback,
    skipToNextMusic,
    skipToNextSlide,
    isMusicLoaded,
    skipTo,
    saveThisSongInRedux,
    songIndex,
    setIsMusicLoaded,
  } = useMusicPlayer({
    pressedId,
    setPressedId,
    songIndexPassed,
    songSliderRefVar,
  })
  const { Save, Get } = useRedux()
  const { playedMusicId, musicController, lastUpdatedFavorite, playingMusics } =
    Get().app
  const [initialIndexMusic, setInitialIndexMusic] = useState(0)

  const [isFavorite, setIsFavorite] = useState(false)

  const updateCurrentRepeatMode = async () => {
    let currentRepeaMode = await TrackPlayer.getRepeatMode()
    if (
      currentRepeaMode == RepeatMode.Queue ||
      currentRepeaMode == RepeatMode.Off
    ) {
      setRepeatMode('nextMusic')
      TrackPlayer.setRepeatMode(RepeatMode.Off)
    } else if (currentRepeaMode == RepeatMode.Track) {
      setRepeatMode('repeatTrack')
    }
  }

  useEffect(() => {
    updateCurrentRepeatMode()
  }, [])

  useEffect(() => {
    checkIsFavorite()
  }, [lastUpdatedFavorite])

  const showSelectedSong = () => {
    // start flatlist with selected item
    setInitialIndexMusic(songIndexPassed)
  }

  const checkIsFavorite = async () => {
    let isFavoriteVar = false
    const favorites = await AsyncStorage.getItem(KEYS.STORAGE.FAVORITES)

    if (favorites) {
      for (let perFavorite of JSON.parse(favorites)) {
        if (perFavorite.id == musicArray[songIndex].id) {
          isFavoriteVar = true
          setIsFavorite(true)
        }
      }
    }
    isFavoriteVar == false && setIsFavorite(false)
  }

  const favoriteMusic = async () => {
    setIsFavorite((prev) => !prev)
    const favorites = await AsyncStorage.getItem(KEYS.STORAGE.FAVORITES)
    if (favorites && !isFavorite) {
      let prevFavorites = JSON.parse(favorites)
      prevFavorites.push(musicArray[songIndex])
      AsyncStorage.setItem(
        KEYS.STORAGE.FAVORITES,
        JSON.stringify(prevFavorites),
      )
    } else if (!isFavorite) {
      AsyncStorage.setItem(
        KEYS.STORAGE.FAVORITES,
        JSON.stringify([musicArray[songIndex]]),
      )
    } else if (favorites) {
      let filtered = JSON.parse(favorites).filter((value: any) => {
        return JSON.parse(value).id !== musicArray[songIndex].id
      })
      AsyncStorage.setItem(KEYS.STORAGE.FAVORITES, JSON.stringify(filtered))
    }
    Save({ lastUpdatedFavorite: Date.now() }, 'app')
  }

  const changeRepeatMode = () => {
    if (repeatMode == 'repeatTrack') {
      TrackPlayer.setRepeatMode(RepeatMode.Off)
      setRepeatMode('nextMusic')
    } else if (repeatMode == 'nextMusic') {
      TrackPlayer.setRepeatMode(RepeatMode.Track)
      setRepeatMode('repeatTrack')
    }
  }

  return {
    favoriteMusic,
    songIndex,
    isFavorite,
    showSelectedSong,
    saveThisSongInRedux,
    initialIndexMusic,
    pressedId,
    setPressedId,
    setSongIndex,
    skipToPreviousSlide,
    skipToNextSlide,
    isMusicLoaded,
    skipTo,
    togglePlayback,
    setRepeatMode,
    repeatMode,
    changeRepeatMode,
    setIsMusicLoaded,
    isSeeking,
    setIsSeeking,
    seek,
    setSeek,
    songSliderRefVar,
  }
}

export default useComponent
