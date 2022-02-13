import React, { forwardRef, memo } from 'react'
import { TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { PropsType } from './models'
import { MainColors } from 'common'
import { log } from '../../common/index'
import { moderateScale } from 'react-native-size-matters'

const CustomTextInput = forwardRef((props: PropsType, ref: any) => {
  const {
    multiline,
    height,
    placeholder,
    styleTextInput,
    onPress,
    onChangeText,
    numberOfLines,
    hasEye,
  } = props

  if (onPress) {
    return (
      <TouchableOpacity style={{ height, flex: 1 }} onPress={onPress}>
        <View style={{ flex: 1 }} pointerEvents="none">
          <TextInput
            {...props}
            ref={ref}
            style={[
              {
                width: '100%',
                flex: 1,
                height: height,
                paddingVertical: numberOfLines !== 1 ? 10 : 0,
              },
              styleTextInput,
            ]}
            placeholder={placeholder}
          />
        </View>
      </TouchableOpacity>
    )
  } else {
    return (
      <TextInput
        {...props}
        ref={ref}
        style={[
          {
            flex: 1,
            height: height,
            paddingVertical: numberOfLines !== 1 ? 10 : 5,
          },
          styleTextInput,
        ]}
        placeholder={placeholder}
      />
    )
  }
})

export default memo(CustomTextInput)

const styles = ({ hasEye }: any) => {
  return StyleSheet.create({
    textInput: {},
  })
}
