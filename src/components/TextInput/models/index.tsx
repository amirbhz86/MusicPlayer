import { TextInputProps, ViewStyle } from 'react-native'

export interface PropsType extends TextInputProps {
  multiline?: any
  height?: any
  placeholder?: any
  styleTextInput?: ViewStyle
  onPress?: any
  onChangeText: any
  hasEye?: boolean
}
