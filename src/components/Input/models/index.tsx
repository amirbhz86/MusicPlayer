import { TextInputProps, ViewStyle, StyleProp, TextStyle } from 'react-native'

export interface PropsType extends TextInputProps {
  title?: string
  // Icon?: any
  width?: string | number
  containerStyle?: ViewStyle
  placeholder?: string
  height: number
  multiline?: boolean
  secureTextEntry?: boolean
  hasEye?: boolean
  textInputContainerStyle?: ViewStyle
  textInputStyle: StyleProp<TextStyle> | {}
  onPress?: () => void
  state?: 'vertical' | 'horizontal'
  textStyle?: TextStyle
  keyboardType?: any
  value?: any
  onChangeValue?: any
  onSubmitEditing?: any
  showInput?: boolean
  setShowInput?: (value: boolean | any) => void
  icon?: React.ReactNode
}
