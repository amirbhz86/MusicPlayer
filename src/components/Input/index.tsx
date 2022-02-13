import { log, MainColors } from '../../common/index'
import {
  Text,
  TextInput,
  PressableRadius,
  Pressable,
} from '../../components/index'
import { ms } from '../../helper/index'
import React, { forwardRef, memo, useState } from 'react'
import { View, TouchableWithoutFeedback, ViewStyle, Image } from 'react-native'
// import { EyeSVG, EyeSlash } from 'assets'
import useComponent from './useComponent'
import { PropsType } from './models'
import { moderateScale } from 'react-native-size-matters'
import { StyleSheet } from 'react-native'

const VerticalOrHorizontalInputLogin = forwardRef(
  (props: PropsType, ref: any) => {
    const {
      title,
      width = '100%',
      containerStyle,
      icon,
      onPress,
      textInputContainerStyle,
      textInputStyle = {},
      height,
      placeholder,
      multiline = false,
      state = 'vertical',
      textStyle,
      onChangeValue,
      numberOfLines = 1,
      value,
      showInput = true,
      setShowInput,
      hasEye = false,
      secureTextEntry,
    } = props
    const { onChangeText } = useComponent({ onChangeValue, secureTextEntry })

    const {
      titleHorizView,
      iconText,
      inputContainer,
      wrapprEyePress,
      innerEyePress,
      textInput,
      fixTextInput,
      horizTextInput,
      firstRow,
      horizInputLoginView,
    } = styles({ icon, height, hasEye })

    if (state === 'vertical') {
      return (
        <View style={[inputContainer, { width, ...containerStyle }]}>
          {title && (
            <View style={firstRow}>
              {/* {Icon && (
                <Icon
                  width={15}
                  height={15}
                  style={{ marginLeft: ms(17), marginRight: ms(10) }}
                />
              )} */}
              <Text size={'small'} type={'bold'} style={[iconText, textStyle]}>
                {title}
              </Text>
            </View>
          )}
          <View style={[textInputContainerStyle, textInput, fixTextInput]}>
            <TextInput
              blurOnSubmit={!multiline ? true : undefined}
              returnKeyType={!multiline ? 'done' : undefined}
              numberOfLines={!multiline ? 1 : 5}
              onChangeText={onChangeText}
              onPress={onPress}
              value={value}
              secureTextEntry={!showInput}
              ref={ref}
              {...props}
            />
            {icon}
            {/* <Image style={{}} source={require('assets/icons/blackSearch.png')}/> */}
            {hasEye && setShowInput && (
              <PressableRadius
                rippleBackgroundColor={'#FF7515'}
                wrapperStyle={wrapprEyePress}
                onPress={() => {}}
                innerStyle={innerEyePress}
              >
                {/* {showInput
                ? <EyeSlash width={15} height={15} />
                : <EyeSVG width={15} height={15} />
              } */}
              </PressableRadius>
            )}
            {/* </View> */}
          </View>
        </View>
      )
    } else if (state == 'horizontal') {
      return (
        <View
          style={[
            horizInputLoginView,
            textInputContainerStyle ? textInputContainerStyle : containerStyle,
            { width },
          ]}
        >
          <TextInput
            numberOfLines={!multiline ? 1 : 5}
            blurOnSubmit={true}
            returnKeyType={'done'}
            onChangeText={onChangeText}
            onPress={onPress}
            value={value}
            styleTextInput={{ ...textInputStyle, ...horizTextInput }}
            ref={ref}
            {...props}
          />
          {hasEye && setShowInput && (
            <PressableRadius
              rippleBackgroundColor={'#FF7515'}
              wrapperStyle={wrapprEyePress}
              onPress={() => setShowInput((value: boolean) => !value)}
              style={innerEyePress}
            >
              {/* {showInput
            ? <EyeSlash width={15} height={15} />
            : <EyeSVG width={15} height={15} />
          } */}
            </PressableRadius>
          )}
          {title && (
            <View style={[titleHorizView]}>
              <Text style={textStyle} size={'xSmall'} type={'bold'}>
                {title}
              </Text>
              {/* {Icon && <Icon style={{ marginRight: ms(17) }} />} */}
            </View>
          )}
        </View>
      )
    } else {
      return <></>
    }
  },
)

export default memo(VerticalOrHorizontalInputLogin)

const styles = (props: any) => {
  const { icon, height, hasEye } = props

  return StyleSheet.create({
    textInput: {
      borderRadius: 8,
      borderWidth: 1,
    },
    horizInputLoginView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputContainer: {
      alignSelf: 'center',
    },
    firstRow: {
      height: 20,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 7,
    },
    horizTextInput: {
      borderRadius: 8,
      borderWidth: 1,
      flex: 1,
    },
    fixTextInput: {
      paddingLeft: 10,
      paddingRight: hasEye ? 50 : 10,
      fontFamily: 'Vazir',
      alignItems: 'center',
      textAlign: 'left',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    titleHorizView: {
      marginLeft: 7,
      justifyContent: 'center',
      alignItems: 'center',
    },
    wrapprEyePress: {
      borderRadius: 15,
      width: 30,
      height: 30,
      backgroundColor: 'yellow',
    },
    innerEyePress: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconText: {
      marginRight: icon ? moderateScale(7) : 10,
    },
  })
}
