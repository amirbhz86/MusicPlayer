import { PinkCheckSVG } from 'assets'
import { BasicColors, MainColors, strings } from 'common'
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

const AddNewModal = ({ withAddTo = false }: PropsType) => {
  const { Get } = useRedux()
  const { isLighttheme } = Get().app
  const {
    topRowView,
    addToPlayListView,
    inputContainer,
    buttonContainer,
    buttonText,
  } = styles({ isLighttheme })
  const { searchingText, setSearchingText, hideModal, onAddNew, addNewModal } =
    useComponent(withAddTo)

  return (
    <Modal
      useNativeDriver={true}
      onBackdropPress={hideModal}
      onBackButtonPress={hideModal}
      hideModalContentWhileAnimating={true}
      isVisible={addNewModal}
    >
      <View
        style={{
          ...addToPlayListView,
          height: 170,
        }}
      >
        <View style={topRowView}>
          <Text color={BasicColors.white}>{strings.newPlaylist}</Text>
        </View>

        {/* <View style={inputContainer}> */}
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

        <View style={buttonContainer}>
          <PressableRadius
            wrapperStyle={{ width: '100%', height: '100%' }}
            borderless={false}
            onPress={onAddNew}
          >
            <Text style={buttonText}>{strings.newCreatePlaylist}</Text>
          </PressableRadius>
        </View>
      </View>
    </Modal>
  )
}

const styles = (props: any) => {
  const { isLighttheme } = props
  return StyleSheet.create({
    containerView: {
      flex: 1,
      backgroundColor: BasicColors.white,
    },
    addToPlayListView: {
      width: '100%',
      backgroundColor: isLighttheme
        ? MainColors.lightBottomTabbar
        : BasicColors.brown,
      position: 'absolute',
      bottom: 0,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
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
      textAlign: 'center',
      borderTopColor: '#cccccc',
      borderTopWidth: 1,
      borderRadius: 12,
      marginTop: 20,
      zIndex: 100,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
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

export default AddNewModal
