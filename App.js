import { BasicColors } from 'common'
import App from 'navigation/Route'
import React, { useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Reducers from './src/redux/index'

import { LogBox } from 'react-native'
LogBox.ignoreLogs(['Warning: ...']) // Ignore log notification by message
LogBox.ignoreAllLogs() //Ignore all log notifications

const AppContainer = () => {
  const [store] = useState(createStore(Reducers))
  const styles = StyleSheet.create({
    containerSafeAreaView: {
      flex: 1,
      backgroundColor: BasicColors.black,
    },
  })

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={BasicColors.black} />
      <Provider store={store}>
        <SafeAreaView style={styles.containerSafeAreaView}>
          <App />
        </SafeAreaView>
      </Provider>
    </>
  )
}

export default AppContainer
