import { useRedux } from 'hooks'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View } from 'react-native'
import { KEYS } from 'common'

export const useComponent = () => {
  const [searchingText, setSearchingText] = useState('')
  const [showNewInput, setShowNewInput] = useState(false)
  const { Save, Get } = useRedux()

  const { addNewModal } = Get().app

  const hideModal = () => {
    Save({ addNewModal: false }, 'app')
  }

  const onAddNew = async () => {
    if (searchingText) {
      let data = []
      const jsonList = await AsyncStorage.getItem(KEYS.STORAGE.PLAYLISTS)
      if (jsonList) {
        data = JSON.parse(jsonList)
      }

      data.push({ id: Date.now(), title: searchingText, musics: [] })
      Save({ playlists: data }, 'app')
      await AsyncStorage.setItem(KEYS.STORAGE.PLAYLISTS, JSON.stringify(data))
      setShowNewInput(false)
      hideModal()
    }
  }

  return {
    searchingText,
    setSearchingText,
    hideModal,
    onAddNew,
    setShowNewInput,
    showNewInput,
    addNewModal,
  }
}

export default useComponent
