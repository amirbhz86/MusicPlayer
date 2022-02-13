import { useRedux } from 'hooks'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View } from 'react-native'
import { KEYS } from 'common'

export const useComponent = (withAddTo = false, selectedMusics = {}) => {
  const [searchingText, setSearchingText] = useState('')
  const [showNewInput, setShowNewInput] = useState(false)
  const [list, setList] = useState([])
  const [selected, setSelected] = useState<any>({})
  const { Save, Get } = useRedux()

  const { addToPlayListModal } = Get().app

  const hideModal = () => {
    Save({ addToPlayListModal: false }, 'app')
  }

  const onAddNew = async () => {
    if (searchingText) {
      let data = []
      const jsonList = await AsyncStorage.getItem(KEYS.STORAGE.PLAYLISTS)
      if (jsonList) {
        data = JSON.parse(jsonList)
      }

      data.push({ id: Date.now(), title: searchingText, musics: [] })

      await AsyncStorage.setItem(KEYS.STORAGE.PLAYLISTS, JSON.stringify(data))
      setShowNewInput(false)
      if (!withAddTo) {
        hideModal()
      } else {
        fetchList()
      }
    }
  }

  const onDone = async () => {
    const ids = Object.keys(selected)

    if (ids.length > 0) {
      const jsonList = await AsyncStorage.getItem(KEYS.STORAGE.PLAYLISTS)
      if (jsonList) {
        const data = JSON.parse(jsonList)
        if (data) {
          data.forEach((item: any, index: number) => {
            if (ids.indexOf(`${item.id}`) !== -1) {
              const newList = [...data[index].musics]
              Object.values(selectedMusics).forEach((i: any) => {
                if (newList.find((l) => l.id === i.id)) return
                newList.push(i)
              })

              data[index].musics = newList
            }
          })
          Save({ playlists: data }, 'app')
          await AsyncStorage.setItem(
            KEYS.STORAGE.PLAYLISTS,
            JSON.stringify(data),
          )
          hideModal()
        }
      }
    }
  }

  const fetchList = async () => {
    const jsonList = await AsyncStorage.getItem(KEYS.STORAGE.PLAYLISTS)
    if (jsonList) {
      const data = JSON.parse(jsonList)
      setList(data)
    }
  }

  useEffect(() => {
    if (withAddTo) {
      fetchList()
      setSelected({})
    }
  }, [withAddTo, addToPlayListModal])

  const onSelected = (id: number) => {
    const newSelected = { ...selected }
    const exist = newSelected[id]
    if (exist) {
      delete newSelected[id]
    } else {
      newSelected[id] = true
    }

    setSelected(newSelected)
  }

  return {
    searchingText,
    setSearchingText,
    hideModal,
    onAddNew,
    onDone,
    setShowNewInput,
    showNewInput,
    list,
    onSelected,
    selected,
    addToPlayListModal,
  }
}

export default useComponent
