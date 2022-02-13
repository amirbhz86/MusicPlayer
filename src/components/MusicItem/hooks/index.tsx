import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { HookPropsType } from '../models'
import TrackPlayer, { Capability, State } from 'react-native-track-player'
import { useRedux } from 'hooks'
import { KEYS } from 'common'
import { usePlaybackState } from 'react-native-track-player'
import { debugInfo } from 'tools'

export const useComponent = (props: HookPropsType) => {
  const {
    navigation,
    musics,
    id,
    songIndex,
    duration = 100,
    name,
    artwork,
    summery,
    url,
  } = props

  const [isSelected, setIsSelected] = useState(false)
  const { Save, Get } = useRedux()
  const { playedMusicId, playingMusics, musicController, recentMusics } =
    Get().app
  const playbackState = usePlaybackState()

  const musicItemOnPress = async () => {
    if (!musics || !id) {
      return
    }
    setIsSelected(false)
    await TrackPlayer.add(musics)
    Save({ playingMusics: musics }, 'app')
    if (!isSelected) {
      navigation.navigate('MusicPlayer', {
        passedData: musics,
        songIndex: songIndex,
        pressedId: Number(id) + 50 * Math.floor(Math.random() * 1000),
      })
    }
  }

  const saveInRecentMusics = async () => {
    let recentLists: any = await AsyncStorage.getItem(KEYS.STORAGE.RECENTLIST)
    let newRecentLists: any = []
    if (recentLists) {
      newRecentLists = [...JSON.parse(recentLists)]
    }
    let status = true
    for (let perRecent of newRecentLists) {
      if (perRecent.id == id) {
        status = false
      }
    }

    if (newRecentLists) {
      if (newRecentLists?.length == 2) {
        newRecentLists.pop()
        newRecentLists = [
          {
            duration,
            name,
            artistName: 'kdfkls',
            artwork,
            summery,
            index: songIndex,
            id: id,
            url,
          },
          ...newRecentLists,
        ]
      } else {
        newRecentLists = [
          {
            duration,
            name,
            artistName: 'kdfkls',
            artwork,
            summery,
            index: songIndex,
            id: id,
            url,
          },
          ...newRecentLists,
        ]
      }
    } else {
      newRecentLists.push({
        duration,
        name,
        artistName: 'kdfkls',
        artwork,
        summery,
        index: songIndex,
        id: id,
        url,
      })
    }
    if (status) {
      AsyncStorage.setItem(
        KEYS.STORAGE.RECENTLIST,
        JSON.stringify(newRecentLists),
      )
      Save({ recentMusics: newRecentLists }, 'app')
    }
  }

  const skipTo = async (trackId: any) => {
    await TrackPlayer.skip(trackId)
  }

  const togglePlayback = async (playbackState: any) => {
    if (!musics) {
      return
    }
    const currentTrack = await TrackPlayer.getCurrentTrack()
    if (playedMusicId == id && currentTrack !== null) {
      await TrackPlayer.pause()
      Save({ playedMusicId: undefined }, 'app')
    } else {
      Save({ playingMusics: musics }, 'app')
      await TrackPlayer.add(musics)
      saveInRecentMusics()
      await TrackPlayer.play()
      Save(
        {
          playedMusicId: id,
          musicController: {
            show: true,
            duration: duration,
            musicName: name,
            artistName: 'kdfkls',
            artwork: artwork,
            index: songIndex,
            id: id,
          },
        },
        'app',
      )
      if (musicController?.id !== id) {
        skipTo(songIndex)
      }
    }
  }

  return {
    setIsSelected,
    isSelected,
    musicItemOnPress,
    togglePlayback,
  }
}

export default useComponent
