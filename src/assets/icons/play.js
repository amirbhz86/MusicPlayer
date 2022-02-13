import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

const SvgComponent = (props) => {
  const { color = '#fff', width = 21.603, height = 24.69 } = props
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        scale={width / 26}
        data-name="Icon play"
        d="M20.465 10.352 3.491.317A2.3 2.3 0 0 0 0 2.309v20.065a2.313 2.313 0 0 0 3.491 1.992l16.974-10.03a2.312 2.312 0 0 0 0-3.983Z"
        fill={color}
      />
    </Svg>
  )
}

export default SvgComponent
