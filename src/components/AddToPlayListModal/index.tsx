import { PinkCheckSVG } from 'assets'
import { BasicColors, MainColors, strings, windowW } from 'common'
import { PressableRadius, Text, Input, Pressable } from 'components'
import { useRedux } from 'hooks'
import { default as React } from 'react'
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import Modal from 'react-native-modal'
import useComponent from './hooks'
import { PropsType } from './models'

const AddToPlaylistModal = ({
  withAddTo = false,
  selectedMusics = {},
}: PropsType) => {
  const { Get } = useRedux()
  const { isLighttheme } = Get().app
  const {
    topRowView,
    addToPlayListView,
    inputContainer,
    buttonContainer,
    buttonText,
    checkBox,
    checkIcon,
    itemWrapper,
    listWrapper,
    itemText,
  } = styles({ windowW, isLighttheme })
  const {
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
  } = useComponent(withAddTo, selectedMusics)

  return (
    <Modal
      useNativeDriver={true}
      onBackdropPress={hideModal}
      onBackButtonPress={hideModal}
      hideModalContentWhileAnimating={true}
      isVisible={addToPlayListModal}
    >
      <View
        style={{
          ...addToPlayListView,
          height: withAddTo ? (showNewInput ? 360 : 310) : 170,
        }}
      >
        <View style={topRowView}>
          {withAddTo ? (
            <>
              <Text color={BasicColors.white}>{strings.addToPlatlist}</Text>
              <PressableRadius
                wrapperStyle={{ borderRadius: 8, marginRight: 20 }}
                onPress={() => setShowNewInput(!showNewInput)}
              >
                <Text
                  color={isLighttheme ? MainColors.summary : BasicColors.pink}
                >
                  {showNewInput
                    ? strings.newCancelPlaylist
                    : strings.newPlaylist}
                </Text>
              </PressableRadius>
            </>
          ) : (
            <Text color={BasicColors.white}>{strings.newPlaylist}</Text>
          )}
        </View>

        {!withAddTo ||
          (showNewInput && (
            <>
              <Input
                textInputContainerStyle={inputContainer}
                placeholder={strings.enterAPlaylistName}
                textInputStyle={{
                  color: '#642A02',
                }}
                onChangeValue={(value: any) => setSearchingText(value)}
                value={searchingText}
                height={40}
                width={'95%'}
              />
              {/* </View> */}
              <PressableRadius
                wrapperStyle={buttonContainer}
                borderless={false}
                onPress={onAddNew}
              >
                <Text style={buttonText}>{strings.newCreatePlaylist}</Text>
              </PressableRadius>
            </>
          ))}

        <View style={listWrapper}>
          <FlatList
            data={list.sort((a, b) => b.id - a.id)}
            renderItem={({ item }: any) => (
              <View style={itemWrapper}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => onSelected(item.id)}
                  style={checkBox}
                >
                  {selected[item.id] && <PinkCheckSVG style={checkIcon} />}
                </TouchableOpacity>
                <Text style={itemText}>{item.title}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        {withAddTo && !showNewInput && (
          // <View style={buttonContainer}>
          <PressableRadius
            wrapperStyle={buttonContainer}
            borderless={false}
            onPress={onDone}
          >
            <Text style={buttonText}>{strings.doneAddToPlatlist}</Text>
          </PressableRadius>
          // </View>
        )}
      </View>
    </Modal>
  )
}

const styles = (props: any) => {
  const { windowW, isLighttheme } = props
  return StyleSheet.create({
    containerView: {
      flex: 1,
      backgroundColor: BasicColors.white,
    },
    addToPlayListView: {
      width: windowW - 20,
      alignSelf: 'center',
      // height: 300,
      backgroundColor: isLighttheme
        ? MainColors.lightBottomTabbar
        : BasicColors.brown,
      position: 'absolute',
      bottom: 0,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    searchImage: {
      width: 20,
      height: 20,
    },
    topRowView: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      height: 50,
    },
    inputContainer: {
      width: '85%',
      height: 40,
      borderWidth: 0.3,
      borderColor: '#FFBD3F',
      backgroundColor: '#FFF5EF',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 12,
      marginTop: 10,
      paddingLeft: 15,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: 50,
      borderTopColor: '#cccccc',
      borderTopWidth: 1,
      borderRadius: 12,
      marginTop: 20,
      zIndex: 100,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      textAlign: 'center',
      alignSelf: 'center',
    },

    listWrapper: {
      marginTop: 10,
      height: 200,
    },
    itemWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 30,
      marginTop: 18,
    },
    checkBox: {
      position: 'relative',
      width: 24,
      height: 24,
      backgroundColor: '#ffffff',
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkIcon: {},
    itemText: {
      fontSize: 14,
      color: '#ffffff',
      marginLeft: 10,
    },
  })
}

export default AddToPlaylistModal
