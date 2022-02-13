import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  containerView: {
    borderRadius: 25,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  knobView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    aspectRatio: 1,
    height: '70%',
    position: 'absolute',
    backgroundColor: 'white',
  },
})
