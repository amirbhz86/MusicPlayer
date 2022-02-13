import React from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native'
import useComponent from './hooks'
import { PropsType } from './models'
import {
  PressableRadius,
  Text,
  MusicController,
  HomeHeader,
  AddToPlayListModal,
  Pressable,
  ToggleAnimated,
} from 'components'
import { BasicColors, strings, windowW, MainColors } from '../../common'
import { BackgroundSVG, CircleAddSVG } from 'assets'
import { useRedux } from 'hooks'
import Modal from 'react-native-modal'
import { ms } from '../../helper/sizing'

const Music = (props: PropsType) => {
  const { navigation } = props
  const { Get } = useRedux()
  const { playingMusics, musicController, isLighttheme } = Get().app
  const {
    musics,
    renderMusic,
    setSelectedCategory,
    selectedCategory,
    categories,
    showAddModal,
    selectedMusicsCount,
    onOpenAddModal,
    selectedMusics,
    loadings,
    setLoadings,
    rendreFlatListFooter,
    loadList,
    byTagMusicsLazyLoad,
    setLoading,
    recentMusics,
    renderRecentMusics,
    renderEmptyMusic,
    loading,
  } = useComponent({ navigation })
  const {
    containerView,
    categoryView,
    categoryRow,
    contentContainer,
    backgroundContainer,
    musicAppText,
    backgroundContentView,
    discoverText,
    toLiveText,
    categoryInnerStyle,
    flastListContainer,
    addModal,
    addModalText,
    addModalButton,
    addModalButtonText,
    indicatorContainer,
    recentListContainer,
  } = styles({ ms, musics, isLighttheme, loading })
  const musicData = new FormData()
  musicData.append('limit', 5)
  musicData.append('offset', musics?.length)

  const renderCategory = ({ item }: any) => {
    const { tag } = item
    return <Category title={tag} />
  }

  const Category = (props: any) => {
    const { title } = props
    const categoriOnPress = (value: string) => {
      setSelectedCategory(title)
      setLoadings((prev) => {
        return { ...prev, musics: true }
      })
    }
    return (
      <PressableRadius
        onPress={() => categoriOnPress(title)}
        innerStyle={categoryInnerStyle}
        wrapperStyle={[
          categoryView,
          {
            backgroundColor:
              selectedCategory == title
                ? MainColors.secondry
                : isLighttheme
                ? MainColors.lightPrimary
                : BasicColors.brown,
          },
        ]}
      >
        <Text type="bold" color={BasicColors.white}>
          {title}
        </Text>
      </PressableRadius>
    )
  }

  const TopBackgrond = () => {
    return (
      <View style={backgroundContainer}>
        <BackgroundSVG
          style={{ marginTop: -2 }}
          height={windowW * 0.6}
          width={windowW}
        />
        <View style={backgroundContentView}>
          <Text
            size="headingTitle"
            color={isLighttheme ? MainColors.secondry : BasicColors.white}
            type="bold"
            style={musicAppText}
          >
            {strings.musicApp}
          </Text>
          <Text
            size="headingTitle"
            style={discoverText}
            color={isLighttheme ? MainColors.secondry : BasicColors.white}
            type="bold"
          >
            {strings.discoverAndListen}
          </Text>
          <Text
            color={isLighttheme ? MainColors.secondry : BasicColors.white}
            size="headingTitle"
            style={toLiveText}
            type="bold"
          >
            {strings.toLiveRadiosMusic}
          </Text>
        </View>
      </View>
    )
  }

  const MusicFlatList = () => {
    return (
      <FlatList
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyMusic}
        onEndReachedThreshold={0.5}
        ListFooterComponent={rendreFlatListFooter}
        onEndReached={() => {
          if (selectedCategory == 'all') {
            loadList(false, musicData)
          } else {
            byTagMusicsLazyLoad.loadList(false, musicData, selectedCategory)
          }
        }}
        contentContainerStyle={{
          paddingBottom: musicController?.show ? 70 : 0,
        }}
        data={musics}
        renderItem={renderMusic}
        keyExtractor={(item: any) => item.id}
      />
    )
  }

  const CategoriesFlatList = () => {
    if (loadings.categories) {
      return (
        <View style={indicatorContainer}>
          <ActivityIndicator
            color={isLighttheme ? 'black' : BasicColors.white}
          />
        </View>
      )
    } else {
      return (
        <FlatList
          data={categories}
          showsHorizontalScrollIndicator={false}
          renderItem={renderCategory}
          horizontal
          contentContainerStyle={{ paddingHorizontal: ms(20) }}
          keyExtractor={(item) => item.tag}
        />
      )
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <ScrollView style={containerView}>
        <HomeHeader navigation={navigation} />
        <TopBackgrond />
        <View style={categoryRow}>
          <Text
            size="large"
            color={isLighttheme ? MainColors.secondry : BasicColors.white}
          >
            {strings.categories}
          </Text>
        </View>
        <View style={flastListContainer}>
          <CategoriesFlatList />
        </View>
        {recentMusics.length !== 0 && selectedCategory == 'all' && (
          <>
            <View style={categoryRow}>
              <Text
                size="medium"
                color={isLighttheme ? MainColors.secondry : BasicColors.white}
              >
                {strings.recentMusics}
              </Text>
            </View>
            <View style={recentListContainer}>
              <FlatList
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
                data={recentMusics}
                renderItem={renderRecentMusics}
                keyExtractor={(item: any) => item.id}
              />
            </View>
          </>
        )}
        <View style={categoryRow}>
          {musics.length !== 0 && (
            <Text
              size="medium"
              color={isLighttheme ? MainColors.secondry : BasicColors.white}
            >
              {selectedCategory == 'all'
                ? strings.allCategories
                : `${selectedCategory} category`}
            </Text>
          )}
          {/* <Pressable>
            <Text color={BasicColors.white}>{strings.viewAll}</Text>
          </Pressable> */}
        </View>
        <View style={contentContainer}>
          <MusicFlatList />
        </View>
      </ScrollView>
      {musicController?.show && <MusicController navigation={navigation} />}
      <Modal
        useNativeDriver={true}
        coverScreen={false}
        hasBackdrop={false}
        hideModalContentWhileAnimating={true}
        isVisible={showAddModal}
      >
        <View style={addModal}>
          <Text
            color={isLighttheme ? BasicColors.black : 'white'}
            style={addModalText}
          >
            {selectedMusicsCount} {strings.musicSelectedCount}
          </Text>
          <PressableRadius
            wrapperStyle={{ borderRadius: 23, marginRight: 5 }}
            rippleBackgroundColor={BasicColors.white}
            onPress={onOpenAddModal}
            innerStyle={addModalButton}
          >
            <Text
              color={isLighttheme ? MainColors.summary : 'white'}
              style={addModalButtonText}
            >
              Add To Playlist
            </Text>
            <CircleAddSVG
              width={27}
              height={25}
              style={{ top: 2 }}
              color={isLighttheme ? MainColors.summary : '#fff'}
            />
          </PressableRadius>
        </View>
      </Modal>
      <AddToPlayListModal withAddTo selectedMusics={selectedMusics} />
    </View>
  )
}

const styles = (props: any) => {
  const { ms, musics, isLighttheme, loading } = props
  return StyleSheet.create({
    containerView: {
      flex: 1,
      backgroundColor: isLighttheme ? BasicColors.white : BasicColors.black,
    },
    backgroundContainer: {
      width: windowW,
      height: windowW * 0.5911,
    },
    discoverText: {
      alignSelf: 'center',
      marginTop: windowW * 0.27,
      letterSpacing: 2,
    },
    toLiveText: {
      alignSelf: 'center',
      position: 'absolute',
      letterSpacing: 2,
      bottom: windowW * 0.12,
    },
    musicAppText: {
      alignSelf: 'center',
      position: 'absolute',
      marginTop: 15,
    },
    categoryView: {
      marginHorizontal: 5,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 7,
    },
    categoryInnerStyle: {
      paddingVertical: 10,
      height: '100%',
    },
    flastListContainer: {
      height: 40,
    },
    categoryRow: {
      marginVertical: 15,
      paddingHorizontal: ms(20),
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    backgroundContentView: {
      width: windowW,
      height: windowW * 0.5911,
      position: 'absolute',
    },
    recentListContainer: {
      paddingHorizontal: ms(20),
      width: '100%',
    },
    contentContainer: {
      width: '100%',
      minHeight: 100,
      height: musics.length * 65 - 10,
      paddingHorizontal: ms(20),
    },
    addModal: {
      backgroundColor: isLighttheme
        ? MainColors.lightBottomTabbar
        : BasicColors.brown,
      border: 0,
      height: 60,
      position: 'absolute',
      top: -20,
      width: '111%',
      left: -20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 10,
    },
    addModalText: {
      fontSize: 16,
    },
    addModalButton: {
      flexDirection: 'row',
      // padding: 10,
    },
    addModalButtonText: {
      fontSize: 15,
      marginRight: 10,
    },
    indicatorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
}

export default Music



