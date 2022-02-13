import AsyncStorage from '@react-native-async-storage/async-storage'
import { KEYS } from 'common'
import { useRedux } from 'hooks'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { MusicItem } from 'components'
import { MusicsServices } from '../../../api/services/index'
import { URL } from '../../../api/api'

export const useComponent = () => {
  const [list, setList] = useState([])
  const [musicList, setMusicList] = useState(null)
  const { Get, Save } = useRedux()
  const { playlists } = Get().app
  const [finallPlayLists, setFinallPlayLists] = useState([])
  const [loading, setLoading] = useState(true)
  const { addNewModal, addToPlayListModal, playingMusics } = Get().app

  const navigation = useNavigation()

  useEffect(() => {
    saveAsyncPlaylists()
  }, [playlists])

  const saveAsyncPlaylists = async () => {
    const jsonList = await AsyncStorage.getItem(KEYS.STORAGE.PLAYLISTS)
    if (jsonList) {
      let data = [...JSON.parse(jsonList)]
      getCategories(data)
    } else {
      getCategories([])
    }
  }

  const getCategories = async (value: any) => {
    const result = await MusicsServices.getPlaylists()
    setLoading(false)
    let newPlaylists: any = []
    if (result) {
      let newCategories = []
      for (let perCategory of result) {
        newCategories.push({ ...perCategory, title: perCategory.name })
      }
      newPlaylists = [...newCategories, ...value]
    } else {
      newPlaylists = [...value]
    }
    setFinallPlayLists(newPlaylists)
  }

  const onDelete = async (id: number) => {
    const jsonList = await AsyncStorage.getItem(KEYS.STORAGE.PLAYLISTS)
    if (jsonList) {
      const data = JSON.parse(jsonList)
      const index = data.findIndex((item: any) => item.id === id)

      if (index !== -1) {
        data.splice(index, 1)
        setList(data)
        Save({ playlists: data }, 'app')
        await AsyncStorage.setItem(KEYS.STORAGE.PLAYLISTS, JSON.stringify(data))
      }
    }
  }

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
    return editedMusics as any
  }

  const onOpen = async (id: number) => {
    setLoading(true)
    let found = finallPlayLists.find((d: any) => d.id === id)
    if (found && 'dislikes' in found) {
      const result = await MusicsServices.getPlaylistMusics(found.id)
      setLoading(false)
      setMusicList(convertData(result.items))
    } else if (found) {
      setLoading(false)
      setMusicList(convertData(found.musics))
    }
  }

  const onBack = () => {
    setMusicList(null)
  }

  const renderMusic = ({ item, index }: any) => {
    return (
      <MusicItem
        {...item}
        songIndex={index}
        musics={musicList}
        navigation={navigation}
        style={{ marginTop: 10 }}
        hasAddButton={false}
      />
    )
  }

  return {
    list,
    onDelete,
    onOpen,
    musicList,
    renderMusic,
    onBack,
    finallPlayLists,
    loading,
  }
}

export default useComponent
