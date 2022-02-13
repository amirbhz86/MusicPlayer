import React, { useRef, useState } from 'react'
import { View, TouchableWithoutFeedback, Animated, Easing } from 'react-native'
import useComponent from './hooks'
import styles from './styles'
import { Header } from '../../components'
import { BasicColors, MainColors } from 'common'

const Example = ({ onPress, centerTitle, initialState = false }) => {
  const { containerView, knobView } = styles
  const {} = useComponent()
  const animation = useRef(new Animated.Value(!!initialState ? 1 : 0)).current
  const [toggled, setToggled] = useState(!!initialState)
  const [containerWidth, setContainerWidth] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)

  const { knobFubView } = stylesFun({ containerWidth, containerHeight })

  const dynamicStyles = {
    text: (inverted, animation) => ({
      alignSelf: 'center',
      opacity: animation.interpolate({
        inputRange: [0, 1],
        outputRange: inverted ? [1, 0] : [0, 1],
      }),
      // color: animation.interpolate({
      //   inputRange: [0, 1] ,
      //   outputRange: [ '#ffffff' ,'#000000'],
      // }),
      // transform: [{ translateY: inverted ? 13 : -13 }],
    }),
    container: (animation) => ({
      backgroundColor: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [BasicColors.white, BasicColors.black],
      }),
      elavation: 1,
      borderWidth: 1,
      borderColor: toggled ? 'white' : MainColors.lightBottomTabbar,
      ...containerView,
    }),
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setToggled(!toggled)
        Animated.timing(animation, {
          duration: 300,
          toValue: toggled ? 0 : 1,
          easing: Easing.bounce,
        }).start()
        onPress && onPress(!toggled)
      }}
    >
      <Animated.View
        style={dynamicStyles.container(animation)}
        onLayout={({
          nativeEvent: {
            layout: { width, height },
          },
        }) => {
          setContainerWidth(width)
          setContainerHeight(height)
        }}
      >
        <Animated.View
          style={[
            knobView,
            {
              backgroundColor: toggled ? 'white' : MainColors.lightBottomTabbar,
            },
            knobFubView,
            {
              transform: [
                {
                  translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      0,
                      containerWidth * 0.9 - containerHeight * 0.7,
                    ],
                  }),
                },
              ],
            },
          ]}
        />
        {!toggled ? (
          <Animated.Text style={[dynamicStyles.text(true, animation)]}>
            {centerTitle}
          </Animated.Text>
        ) : (
          <Animated.Text
            style={[dynamicStyles.text(false, animation), styles.texttoggled]}
          >
            {centerTitle}
          </Animated.Text>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

const stylesFun = ({ containerWidth, containerHeight }) => {
  return {
    knobFubView: {
      marginLeft: containerWidth * 0.05,
      borderRadius: containerHeight * 0.4,
    },
  }
}

export default Example
