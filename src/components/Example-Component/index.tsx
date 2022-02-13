import React from 'react'
import { View } from 'react-native'
import styles from './styles'
import useComponent from './hooks'
import { PropsType } from './models'
import { Text } from 'component/index'
import { debug } from 'tools/index'

const Example = (props: PropsType) => {
  const { containerView } = styles
  const {} = useComponent()

  return <View style={containerView}></View>
}

export default Example
