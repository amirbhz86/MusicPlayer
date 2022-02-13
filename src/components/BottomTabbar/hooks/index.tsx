import React from 'react'
import { View } from 'react-native'
import { useRedux } from 'hooks'
// import { Text } from 'component/index'
// import { debug } from 'tools/index'

export const useComponent = (props: any) => {
  const { navigation } = props
  const { Save } = useRedux()

  const handleNavigate = (tabName: any) => {
    navigation.navigate(tabName)
    Save({ tabSelected: tabName }, 'app')
  }

  return {
    handleNavigate,
  }
}

export default useComponent
