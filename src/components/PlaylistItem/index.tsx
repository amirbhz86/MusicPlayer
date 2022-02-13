import { TrashSVG } from 'assets'
import { BasicColors, MainColors, windowW } from 'common'
import { PressableRadius, Text } from 'components'
import { useRedux } from 'hooks'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ms } from 'react-native-size-matters'
import useComponent from './hooks'
import { PropsType } from './models'

const PlaylistItem = (props: PropsType) => {
  const { title, onDelete, onOpen } = props
  const { Get } = useRedux()
  const { isLighttheme } = Get().app
  const { containerView, itemWrapperStyle, itemInnerStyle, pressableContent } =
    styles({ MainColors, isLighttheme })
  const {} = useComponent()

  return (
    <PressableRadius
      wrapperStyle={itemWrapperStyle}
      innerStyle={itemInnerStyle}
      onPress={onOpen}
    >
      <View style={pressableContent}>
        <Text color={BasicColors.white}>{title}</Text>
        <PressableRadius onPress={onDelete}>
          <TrashSVG color={isLighttheme ? MainColors.secondry : undefined} />
        </PressableRadius>
      </View>
    </PressableRadius>
  )
}

const styles = (props: any) => {
  const { MainColors, isLighttheme } = props
  return StyleSheet.create({
    containerView: {
      flex: 1,
      backgroundColor: BasicColors.white,
    },
    itemInnerStyle: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    pressableContent: {
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 10,
    },
    itemWrapperStyle: {
      width: windowW - ms(40),
      height: 60,
      backgroundColor: isLighttheme
        ? MainColors.lightBottomTabbar
        : MainColors.darkerBrown,
      alignSelf: 'center',
      marginTop: 10,
      borderRadius: 10,
    },
  })
}

export default PlaylistItem
