import * as React from 'react'
import Svg, { Path, G } from 'react-native-svg'
import { View } from 'react-native'

const SvgComponent = (props) => {
  const { color = '#fff', width, height } = props
  return (
    <View style={{ width, height }}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        {...props}
      >
        <Path
          scale={width / 26}
          data-name="Icon ionic-ios-close"
          d="m16.188 13.083 9.348-9.348a2.192 2.192 0 1 0-3.1-3.1l-9.348 9.348L3.74.635a2.192 2.192 0 1 0-3.1 3.1l9.348 9.348L.64 22.431a2.192 2.192 0 0 0 3.1 3.1l9.348-9.348 9.348 9.348a2.192 2.192 0 0 0 3.1-3.1Z"
          fill={color}
        />
      </Svg>
    </View>
  )
}

export default SvgComponent
