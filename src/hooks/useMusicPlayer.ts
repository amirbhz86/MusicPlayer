import { useEffect, useState } from 'react'
import { useRedux } from 'hooks'
import { windowW } from 'common'
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player'
let scrollTo: any

interface PropsTypes {
  pressedId?: string
  songIndexPassed?: number
  songSliderRefVar?: any
  setPressedId?: any
  playedMusicId?: any
}

let sliderRef: any

const useMusicPlayer = (props: PropsTypes) => {
  const { songIndexPassed, pressedId, setPressedId, songSliderRefVar } = props
  let playedMusicIdVar = props.playedMusicId
  const { Save, Get } = useRedux()
  const {
    playedMusicId,
    musicController,
    lastUpdatedFavorite,
    songSliderRef,
    playingMusics,
  } = Get().app
  const [songIndex, setSongIndex] = useState(0)
  const playbackState = usePlaybackState()
  const [songsFlatListRef, setSongsFlatListRef] = useState()
  const [isMusicLoaded, setIsMusicLoaded] = useState(true)
  const progress = useProgress()

  useEffect(() => {
    // save SongSliderRef for the next using
    if (songSliderRefVar && songSliderRefVar.current) {
      setSongsFlatListRef(songSliderRefVar)
      Save({ songSliderRef: songSliderRefVar }, 'app')
    }
    return () => {
      // delete songSliderRef because home screen does'nt have FlatList
      Save({ songSliderRef: undefined }, 'app')
    }
  }, [])

  const skipTo = async (trackId: any) => {
    // change music
    TrackPlayer.skip(trackId)
    TrackPlayer.play()
  }

  // useTrackPlayerEvents helps you to controll of Events
  useTrackPlayerEvents([Event.RemotePlay], () => {
    Save({ playedMusicId: musicController?.id }, 'app')
    TrackPlayer.play()
  })
  useTrackPlayerEvents([Event.RemotePause], () => {
    Save({ playedMusicId: undefined }, 'app')
    TrackPlayer.pause()
  })

  useTrackPlayerEvents([Event.PlaybackTrackChanged], (trackData) => {
    if (trackData.nextTrack < 1 && musicController?.index !== 0) {
    }

    if (!playingMusics || musicController?.index == undefined) {
      return
    }
    if (songSliderRef) {
      if (trackData.nextTrack < 0) {
        skipTo(0)
        TrackPlayer.pause()
        Save({ playedMusicId: undefined }, 'app')
        return
      } else if (
        trackData.nextTrack > playingMusics.length - 1 &&
        scrollTo !== trackData.nextTrack
      ) {
        skipTo(musicController?.index)
        TrackPlayer.pause()
        Save({ playedMusicId: undefined }, 'app')
        return
      }

      if (
        trackData.nextTrack > musicController?.index &&
        scrollTo !== trackData.nextTrack
      ) {
        scrollTo = trackData.nextTrack
        scollToSpecificIndex(trackData.nextTrack)
        saveThisSongInRedux(trackData.nextTrack)
      } else if (
        trackData.nextTrack < musicController?.index &&
        scrollTo !== trackData.nextTrack
      ) {
        scrollTo = trackData.nextTrack
        scollToSpecificIndex(trackData.nextTrack)
        saveThisSongInRedux(trackData.nextTrack)
      }
    } else {
      if (trackData.nextTrack > playingMusics?.length - 1) {
        skipToSpecificIndex(0)
      } else if (trackData.nextTrack < 0) {
        skipToSpecificIndex(playingMusics.length - 1)
      } else {
        skipToSpecificIndex(trackData.nextTrack)
      }
    }
    // nextTrack
  })

  useTrackPlayerEvents([Event.PlaybackQueueEnded], (pp: any) => {
    if (!songSliderRef) {
      Save({ playedMusicId: undefined }, 'app')
      TrackPlayer.pause()
    }
  })

  const skipToPreviousSlide = () => {
    if (!playingMusics) {
      return
    }
    if (musicController?.index === 0 || musicController?.index == undefined) {
      return
    }
    // scrolling image
    setPressedId && setPressedId(undefined)
    scollToSpecificIndex(songIndex - 1)
  }

  const scollToSpecificIndex = (index: number) => {
    songSliderRef.current.scrollToOffset({
      offset: index * windowW,
    })
  }

  const skipToNextSlide = () => {
    // scrolling image
    if (!playingMusics) {
      return
    }
    if (
      songIndex === playingMusics.length - 1 ||
      musicController?.index == undefined
    ) {
      return
    }

    setPressedId && setPressedId(undefined)
    scollToSpecificIndex(songIndex + 1)
  }

  const saveThisSongInRedux = (index = songIndex) => {
    if (!playingMusics || playingMusics.length == 0) {
      return
    }

    Save(
      {
        playedMusicId: playingMusics[index].id,
        musicController: {
          show: true,
          duration: 456,
          musicName: playingMusics[index].name,
          artistName: 'kdfkls',
          artwork: playingMusics[index].artwork,
          index: index,
          id: playingMusics[index].id,
        },
      },
      'app',
    )
  }

  const toggleItemPlayback = async (props: any) => {
    // toggleitemplayback for music player
    const { musics, id, duration, name, artwork } = props
    if (!musics) {
      return
    }
    const currentTrack = await TrackPlayer.getCurrentTrack()
    if (playedMusicId == id && playedMusicId && currentTrack !== null) {
      await TrackPlayer.pause()
      Save({ playedMusicId: undefined }, 'app')
    } else {
      await TrackPlayer.add(musics)
      await TrackPlayer.play()
      Save({ playingMusics: musics }, 'app')
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

  const skipToPreviousMusic = () => {
    if (!musicController || !playingMusics) {
      return
    }
    if (musicController?.index !== undefined && musicController.index > 0) {
      skipToSpecificIndex(musicController?.index - 1)
    } else if (musicController.index == 0) {
      skipToSpecificIndex(playingMusics?.length - 1)
    }
  }

  const togglePlayback = async () => {
    if (!playingMusics) {
      return
    }
    const currentTrack = await TrackPlayer.getCurrentTrack()
    if (currentTrack !== null) {
      if (musicController?.id === playingMusics[songIndex].id) {
        if (playbackState == State.Paused) {
          await TrackPlayer.play()
          saveThisSongInRedux()
        } else {
          await TrackPlayer.pause()
          Save({ playedMusicId: undefined }, 'app')
        }
      } else if (playbackState == State.Paused) {
        TrackPlayer.skip(songIndex)
        await TrackPlayer.play()
        saveThisSongInRedux()
      } else {
        setIsMusicLoaded(false)
        saveThisSongInRedux()
        TrackPlayer.skip(songIndex)
        await TrackPlayer.play()
      }
    }
  }

  const skipToSpecificIndex = (index: number) => {
    if (!playingMusics || playingMusics.length == 0) {
      return
    }
    skipTo(index)
    Save(
      {
        musicController: {
          duration: 456,
          show: true,
          musicName: playingMusics[index].name,
          artistName: 'dfsdf',
          artwork: playingMusics[index].artwork,
          index: index,
          id: playingMusics[index].id,
        },
      },
      'app',
    )
    if (playedMusicId) {
      Save({ playedMusicId: playingMusics[index].id }, 'app')
    }
  }

  const skipToNextMusic = async () => {
    if (!playingMusics || !musicController) {
      return
    }

    if (
      musicController?.index !== undefined &&
      musicController.index < playingMusics?.length - 1
    ) {
      skipToSpecificIndex(musicController.index + 1)
    } else if ((musicController.index = playingMusics?.length)) {
      skipToSpecificIndex(0)
    }
  }

  useEffect(() => {
    // in MusicPlayer screen when scrolling or skip to next or previous music
    if (songIndexPassed == songIndex) {
      setPressedId(undefined)
    }
  }, [songIndex])

  return {
    songIndex,
    saveThisSongInRedux,
    setSongIndex,
    skipToPreviousSlide,
    skipTo,
    skipToNextMusic,
    skipToNextSlide,
    isMusicLoaded,
    setIsMusicLoaded,
    togglePlayback,
    toggleItemPlayback,
    skipToPreviousMusic,
    setSongsFlatListRef,
  }
}

export default useMusicPlayer
