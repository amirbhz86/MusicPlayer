import { MusicItem, Text } from 'components'
import { useMusicPlayer, useRedux } from 'hooks'
import React, { useEffect, useState } from 'react'
import TrackPlayer, { Capability } from 'react-native-track-player'
import { URL } from '../../../api/api'
import { MusicsServices } from '../../../api/services'
import { HookPropsType } from '../models'
import { BasicColors, KEYS, MainColors } from 'common'
import { useLazyLoad } from 'hooks'
import { strings } from 'common'
import { ActivityIndicator, View } from 'react-native'
import { debugInfo } from 'tools'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useComponent = (props: HookPropsType) => {
  const { navigation } = props
  const [categories, setCategories] = useState<any>([])
  const [musics, setMusics] = useState([])
  const [byTagmusics, setByTagMusics] = useState([])
  const { Get, Save } = useRedux()
  const { isLighttheme } = Get().app

  const convertData = (data: any[]) => {
    let editedMusics = []
    if (data) {
      for (let perMusic of data) {
        editedMusics.push({
          artwork: `${URL}assets/image/stations/${perMusic.image_image}`,
          ...perMusic,
        })
      }
    }
    return editedMusics
  }

  const [selectedCategory, setSelectedCategory] = useState('all')
  const { loading, loadList, finished, setLoading, setFinished } = useLazyLoad(
    musics,
    setMusics,
    MusicsServices.getMusics,
    20,
    undefined,
    convertData,
  )
  const byTagMusicsLazyLoad = useLazyLoad(
    musics,
    setMusics,
    MusicsServices.getMusicByTag,
    20,
    undefined,
    convertData,
  )
  const {
    playingMusics,
    addToPlayListModal,
    playedMusicId,
    musicController,
    recentMusics,
  } = Get().app
  const [selectedMusics, setSelectedMusics] = useState<any>({})
  const [loadings, setLoadings] = useState({ categories: true, musics: true })
  const [showAddModal, setShowAddModal] = useState(false)

  const getCategories = async () => {
    const result = await MusicsServices.getCategories()
    if (result) {
      setLoadings((prev) => {
        return { ...prev, categories: false }
      })
      let editedCategories = [{ tag: 'all' }, ...result]
      setCategories(editedCategories)
    }
  }

  const rendreFlatListFooter = () => {
    return (!finished && loading) ||
      (!finished && byTagMusicsLazyLoad.loading) ? (
      <ActivityIndicator
        size="large"
        color={isLighttheme ? MainColors.summary : BasicColors.white}
      />
    ) : null
  }

  const renderMusic = ({ item, index }: any) => {
    return (
      <MusicItem
        songIndex={index}
        musics={musics}
        navigation={navigation}
        onAdd={() => onSelectedMusic(item)}
        selected={!!selectedMusics[item.id]}
        style={{
          marginVertical: index == 0 ? 0 : 5,
          marginBottom: index == 0 ? 5 : undefined,
        }}
        {...item}
      />
    )
  }

  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer()
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
      stopWithApp: false,
      alwaysPauseOnInterruption: true,
    })
  }

  const saveAsyncRecentList = async () => {
    const result: any = await AsyncStorage.getItem(KEYS.STORAGE.RECENTLIST)
    if (result) {
      Save({ recentMusics: JSON.parse(result) }, 'app')
    }
  }

  useEffect(() => {
    saveAsyncRecentList()
  }, [])

  useEffect(() => {
    setMusics([])
    setFinished(false)
    byTagMusicsLazyLoad.setLoading(true)
    if (selectedCategory == 'all') {
      const musicData = new FormData()
      musicData.append('limit', 20)
      musicData.append('offset', 0)
      loadList(true, musicData)
    } else {
      const musicData = new FormData()
      musicData.append('limit', 20)
      musicData.append('offset', 0)
      byTagMusicsLazyLoad.loadList(true, musicData, selectedCategory)
    }
  }, [selectedCategory])

  const getMusicsByTag = async () => {
    const result = await MusicsServices.getMusicByTag(selectedCategory)
    if (result) {
      let editedMusics: any = []
      for (let perMusic of result) {
        editedMusics.push({ artwork: perMusic.image_image, ...perMusic })
      }
      setLoadings((prev) => {
        return { ...prev, musics: false }
      })
      setMusics(result)
    }
  }

  useEffect(() => {
    setupPlayer()
    getCategories()
    return () => {
      TrackPlayer.stop()
    }
  }, [])

  const renderEmptyMusic = () => {
    if (!loading && finished) {
      return (
        <View
          style={{
            flex: 1,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            color={isLighttheme ? MainColors.summary : 'white'}
            size="medium"
          >
            {strings.thereIsNoMusic}
          </Text>
        </View>
      )
    } else {
      return <></>
    }
  }

  const onSelectedMusic = (item: any) => {
    const newSelected = { ...selectedMusics }
    const exist = newSelected[item.id]
    if (exist) {
      delete newSelected[item.id]
    } else {
      newSelected[item.id] = item
    }

    if (Object.keys(newSelected).length > 0) {
      setShowAddModal(true)
    } else {
      setShowAddModal(false)
    }

    setSelectedMusics(newSelected)
  }

  const onOpenAddModal = () => {
    setShowAddModal(false)
    Save({ addToPlayListModal: true }, 'app')
  }

  const renderRecentMusics = ({ item, index }: any) => {
    return (
      <MusicItem
        hasAddButton={false}
        songIndex={index}
        musics={recentMusics}
        navigation={navigation}
        onAdd={() => onSelectedMusic(item)}
        selected={!!selectedMusics[item.id]}
        style={{ marginTop: index == 0 ? 0 : 10 }}
        {...item}
      />
    )
  }

  useEffect(() => {
    if (addToPlayListModal === false) {
      setSelectedMusics({})
    }
  }, [addToPlayListModal])

  return {
    renderRecentMusics,
    setLoading,
    categories,
    musics,
    renderMusic,
    setSelectedCategory,
    selectedCategory,
    showAddModal,
    selectedMusicsCount: Object.keys(selectedMusics).length,
    selectedMusics,
    onOpenAddModal,
    loadings,
    setLoadings,
    rendreFlatListFooter,
    loadList,
    byTagMusicsLazyLoad,
    recentMusics,
    renderEmptyMusic,
    loading,
  }
}

export default useComponent
