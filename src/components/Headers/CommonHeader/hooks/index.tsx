export const useComponent = (props: any) => {
  const { navigation, rightIconPress } = props

  const searchOnPress = () => {
    navigation.navigate('Search')
    rightIconPress()
  }

  return {
    searchOnPress,
  }
}

export default useComponent
