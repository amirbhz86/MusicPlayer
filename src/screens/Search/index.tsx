import React from 'react'
import { View, Image, StyleSheet, FlatList } from 'react-native'
import useComponent from './hooks'
import { PropsType } from './models'
import { CommonHeader, Input, MusicController } from 'components'
import { strings, BasicColors, MainColors } from 'common'
import { vs, ms } from '../../helper/sizing'
import { useRedux } from 'hooks'

const Search = (props: PropsType) => {
  const { Get } = useRedux()
  const { navigation } = props
  const { isLighttheme, musicController } = Get().app
  const { containerView, inputContainer, searchImage, searchContainer } =
    styles({ BasicColors, vs, isLighttheme })
  const { renderMusic, emptyMusic, searched, setSearched, musics } =
    useComponent(props)

  return (
    <View style={containerView}>
      <CommonHeader title={strings.search} hasBack={false} />
      <Input
        width={'85%'}
        height={40}
        value={searched}
        onChangeValue={(value: string) => setSearched(value)}
        icon={
          isLighttheme ? (
            <Image
              style={searchImage}
              source={require('assets/icons/lightSearch.png')}
            />
          ) : (
            <Image
              style={searchImage}
              source={require('assets/icons/blackSearch.png')}
            />
          )
        }
        textInputContainerStyle={inputContainer}
        placeholder={strings.searchMusic}
        containerStyle={{ marginTop: 15 }}
        textInputContainerStyle={{
          backgroundColor: isLighttheme ? undefined : 'white',
          borderWidth: 1.5,
          borderColor: isLighttheme ? MainColors.secondry : undefined,
        }}
        textInputStyle={{
          color: isLighttheme ? 'red' : '#642A02',
        }}
      />
      <View style={searchContainer}>
        <FlatList
          renderItem={renderMusic}
          data={musics}
          ListEmptyComponent={emptyMusic}
        />
      </View>
      {musicController?.show && <MusicController navigation={navigation} />}
    </View>
  )
}

const styles = (props: any) => {
  const { vs, BasicColors, isLighttheme } = props
  return StyleSheet.create({
    searchContainer: {
      paddingHorizontal: ms(20),
    },
    containerView: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: isLighttheme ? BasicColors.white : BasicColors.black,
    },
    searchImage: {
      width: 20,
      height: 20,
    },
    inputContainer: {
      height: 40,
      borderWidth: 0.3,
      borderColor: isLighttheme ? MainColors.secondry : '#FFBD3F',
      backgroundColor: isLighttheme ? BasicColors.white : '#FFF5EF',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 12,
      marginTop: vs(30),
      paddingLeft: 15,
    },
  })
}

export default Search
