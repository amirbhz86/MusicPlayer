import { useRedux } from 'hooks'
import { useState, useEffect } from 'react'
import TrackPlayer, { RepeatMode } from 'react-native-track-player'
import { debugInfo } from 'tools'

export const useComponent = () => {
  const { Save, Get } = useRedux()
  const { musicController, playedMusicId, playingMusics } = Get().app
  const [repeatMode, setRepeatMode] = useState<
    'nextMusic' | 'off' | 'repeatTrack'
  >('off')

  const updateCurrentRepeatMode = async () => {
    let currentRepeaMode = await TrackPlayer.getRepeatMode()
    if (
      currentRepeaMode == RepeatMode.Queue ||
      currentRepeaMode == RepeatMode.Off
    ) {
      setRepeatMode('nextMusic')
      TrackPlayer.setRepeatMode(RepeatMode.Queue)
    } else if (currentRepeaMode == RepeatMode.Track) {
      setRepeatMode('repeatTrack')
    }
  }

  useEffect(() => {
    updateCurrentRepeatMode()
  }, [])

  const changeRepeatMode = () => {
    if (repeatMode == 'repeatTrack') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue)
      setRepeatMode('nextMusic')
    } else if (repeatMode == 'nextMusic') {
      TrackPlayer.setRepeatMode(RepeatMode.Track)
      setRepeatMode('repeatTrack')
    }
  }

  const togglePlayback = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack()
    if (currentTrack !== null) {
      if (playedMusicId) {
        await TrackPlayer.pause()
        Save({ playedMusicId: undefined }, 'app')
      } else {
        Save({ playedMusicId: musicController?.id }, 'app')
        await TrackPlayer.play()
        let duu = await TrackPlayer.getDuration()
        debugInfo(duu, 'duu')
      }
    }
  }

  const removeMusicController = () => {
    TrackPlayer.stop()
    Save(
      {
        musicController: {
          ...musicController,
          show: false,
        },
        playedMusicId: undefined,
        playingMusics: [],
      },
      'app',
    )
  }

  return {
    removeMusicController,
    togglePlayback,
    repeatMode,
    setRepeatMode,
    changeRepeatMode,
  }
}

export default useComponent
