import { BasicColors, MainColors, strings, windowW } from 'common'
import {
  AddNewModal,
  CommonHeader,
  PlaylistItem,
  Text,
  MusicController,
} from 'components'
import { useRedux } from 'hooks'
import React, { useEffect } from 'react'
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native'
import { ms, vs } from '../../helper/sizing'
import useComponent from './hooks'
import { PropsType } from './models'

const Playlists = (props: PropsType) => {
  const { navigation } = props
  const {
    list,
    onDelete,
    musicList,
    onOpen,
    renderMusic,
    onBack,
    finallPlayLists,
    loading,
  } = useComponent()
  const { Save, Get } = useRedux()
  const { isLighttheme, musicController, playlists } = Get().app
  const { containerView, addToPlayListView, topRowView, noMusicContainer } =
    styles({ isLighttheme })

  const emptyPlayList = () => {
    return (
      <View style={noMusicContainer}>
        <Text
          size={'large'}
          color={isLighttheme ? MainColors.summary : 'white'}
        >
          {strings.thereIsNoPlayList}
        </Text>
      </View>
    )
  }

  const emptyMusic = () => {
    return (
      <View style={noMusicContainer}>
        <Text
          size={'large'}
          color={isLighttheme ? MainColors.summary : 'white'}
        >
          {strings.thereIsNoMusic}
        </Text>
      </View>
    )
  }

  return (
    <View style={containerView}>
      <CommonHeader
        rightIcon={!!musicList ? undefined : 'NewPlaylist'}
        title={!!musicList ? 'Musics' : strings.playlists}
        rightIconPress={
          !!musicList ? () => {} : () => Save({ addNewModal: true }, 'app')
        }
        hasBack={!!musicList}
        onBack={onBack}
      />

      {loading ? (
        <View style={{ height: 150, justifyContent: 'flex-end' }}>
          <ActivityIndicator
            size="large"
            color={isLighttheme ? MainColors.summary : 'white'}
          />
        </View>
      ) : !!musicList ? (
        <FlatList
          data={musicList}
          renderItem={renderMusic}
          keyExtractor={(item: any) => item.id}
          ListEmptyComponent={emptyMusic}
          contentContainerStyle={{ paddingHorizontal: ms(20) }}
        />
      ) : (
        <FlatList
          data={!!musicList ? [] : finallPlayLists}
          style={{ marginTop: vs(20) }}
          contentContainerStyle={{ paddingBottom: 10 }}
          renderItem={({ item }: any) => (
            <PlaylistItem
              {...item}
              onDelete={() => onDelete(item.id)}
              onOpen={() => onOpen(item.id)}
            />
          )}
          ListEmptyComponent={emptyPlayList}
          keyExtractor={(item) => item.id}
        />
      )}
      <AddNewModal />
      {musicController?.show && <MusicController navigation={navigation} />}
    </View>
  )
}
const styles = (props: any) => {
  const { isLighttheme } = props
  return StyleSheet.create({
    containerView: {
      flex: 1,
      backgroundColor: isLighttheme ? BasicColors.white : BasicColors.black,
    },
    addToPlayListView: {
      width: windowW,
      height: 300,
      backgroundColor: BasicColors.brown,
      position: 'absolute',
      bottom: 0,
    },
    topRowView: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      height: 50,
    },
    noMusicContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: vs(150),
    },
  })
}

export default Playlists
