import React, { useEffect, useState } from 'react'
import { MusicItem } from 'components'
import { useRedux } from 'hooks'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { KEYS } from 'common'

export const useComponent = () => {
  const { Get, Save } = useRedux()
  const { playingMusics, lastUpdatedFavorite } = Get().app

  const navigation = useNavigation()

  const [list, setList] = useState([])

  useEffect(() => {
    fetchList()
  }, [lastUpdatedFavorite])

  const fetchList = async () => {
    const jsonList = await AsyncStorage.getItem(KEYS.STORAGE.FAVORITES)
    if (jsonList) {
      const data = JSON.parse(jsonList)
      setList(data)
    }
  }

  const onDelete = async (index: number) => {
    const jsonList = await AsyncStorage.getItem(KEYS.STORAGE.FAVORITES)
    if (jsonList) {
      const data = JSON.parse(jsonList)
      data.splice(index, 1)
      await AsyncStorage.setItem(KEYS.STORAGE.FAVORITES, JSON.stringify(data))
      Save({ lastUpdatedFavorite: Date.now() }, 'app')
    }
  }

  const renderMusic = ({ item, index }: any) => {
    return (
      <MusicItem
        songIndex={index}
        musics={list}
        navigation={navigation}
        {...item}
        style={{ marginTop: 10 }}
        hasAddButton={false}
        onRemoveFav={() => onDelete(index)}
      />
    )
  }
  return {
    renderMusic,
    list,
  }
}

export default useComponent
