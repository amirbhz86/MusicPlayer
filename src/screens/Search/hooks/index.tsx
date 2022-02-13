import { URL } from 'api/api'
import { MainColors, strings } from 'common'
import { MusicItem, Text } from 'components'
import { ms, vs } from 'helper'
import { useLazyLoad, useRedux } from 'hooks'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { debugInfo } from 'tools'
import { MusicsServices } from '../../../api/services'

export const useComponent = (props: any) => {
  const { navigation } = props
  const { Get } = useRedux()
  const { isLighttheme } = Get().app
  const { emptyContainer } = styles({})
  const [searched, setSearched] = useState('')
  const [musics, setMusics] = useState([])

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
  const searchData = new FormData()
  searchData.append('limit', 5)
  searchData.append('offset', musics.length)
  searchData.append('query', searched)
  const { loading, setLoading, loadList, finished } = useLazyLoad(
    musics,
    setMusics,
    MusicsServices.getMusics,
    5,
    undefined,
    convertData,
    searchData,
  )

  const renderMusic = ({ item, index }: any) => {
    return (
      <MusicItem
        hasAddButton={false}
        songIndex={index}
        musics={musics}
        navigation={navigation}
        style={{ marginTop: 10 }}
        // onAdd={() => onSelectedMusic(item)}
        // selected={!!selectedMusics[item.id]}
        {...item}
      />
    )
  }

  useEffect(() => {
    debugInfo(musics, 'musics')
  }, [musics])

  const searchMusic = async () => {
    let searchData = {
      limit: 10,
      offset: 0,
      query: searched,
    }
    const dd = new FormData()
    dd.append('limit', 10)
    dd.append('offset', 0)
    dd.append('query', searched)
    const result = await MusicsServices.getMusics(dd)
  }

  useEffect(() => {
    if (searched) {
      loadList(true)
    }
  }, [searched])

  const emptyMusic = () => {
    return (
      <View style={emptyContainer}>
        <Text
          size={'large'}
          color={isLighttheme ? MainColors.summary : 'white'}
        >
          {strings.thereIsNoMusic}
        </Text>
      </View>
    )
  }
  return {
    renderMusic,
    emptyMusic,
    setSearched,
    searched,
    musics,
  }
}

const styles = (props: any) => {
  return StyleSheet.create({
    emptyContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: vs(150),
    },
  })
}

export default useComponent
