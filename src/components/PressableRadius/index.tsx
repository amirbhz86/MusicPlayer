//@ts-nocheck
import { BasicColors } from 'common'
import { LightenDarkenColor } from 'lighten-darken-color'
import React, { FC, memo } from 'react'
import {
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { Props } from './models'
import styles from './styles'

// height and width > innerStyle
// borderRadius > wrapperStyle
// padding > innerStyle
// margin ? wrapperStyle

const PressableRound: FC<Props> = memo((props) => {
  const {
    backgroundColor,
    rippleBackgroundColor,
    innerStyle = {},
    wrapperStyle,
    borderless = true,
    onPress,
  } = props
  const { paddingHorizontal, paddingVertical, justifyContent, alignItems } =
    innerStyle
  const { defaultInnerPress, innerPress, defaultInnerTouch } = funStyles({
    paddingHorizontal,
    paddingVertical,
    justifyContent,
    alignItems,
  })

  const renderContent = () => {
    if (Platform.OS === 'android') {
      return (
        <View style={[wrapperStyle, { overflow: 'hidden' }]}>
          <Pressable
            onPress={onPress}
            style={[defaultInnerPress, innerPress, innerStyle]}
            android_ripple={{
              color: rippleBackgroundColor
                ? rippleBackgroundColor
                : backgroundColor
                ? LightenDarkenColor(backgroundColor, 50)
                : BasicColors.white,
              borderless: borderless,
            }}
            {...props}
          >
            {props.children}
          </Pressable>
        </View>
      )
    } else {
      return (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.5}
          {...props}
          style={[
            { backgroundColor },
            wrapperStyle,
            innerStyle,
            defaultInnerTouch,
          ]}
        >
          {props.children}
        </TouchableOpacity>
      )
    }
  }

  return <>{renderContent()}</>
})

const funStyles = ({
  paddingVertical,
  paddingHorizontal,
  alignItems,
  justifyContent,
}: any) => {
  return StyleSheet.create({
    defaultInnerPress: {
      paddingVertical: paddingVertical == undefined ? 10 : paddingVertical,
      paddingHorizontal:
        paddingHorizontal == undefined ? 10 : paddingHorizontal,
      justifyContent: justifyContent == undefined ? 'center' : justifyContent,
      alignItems: alignItems == undefined ? 'center' : alignItems,
    },
    defaultInnerTouch: {
      paddingVertical: paddingVertical == undefined ? 10 : paddingVertical,
      paddingHorizontal:
        paddingHorizontal == undefined ? 10 : paddingHorizontal,
      justifyContent: justifyContent == undefined ? 'center' : justifyContent,
      alignItems: alignItems == undefined ? 'center' : alignItems,
    },
    innerPress: {
      flex: 1,
    },
  })
}
export default PressableRound
