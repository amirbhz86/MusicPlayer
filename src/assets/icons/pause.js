import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

const SvgComponent = (props) => {
  const { color = '#fff' } = props
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={17.5} height={24} {...props}>
      <Path
        data-name="Icon ionic-md-pause"
        d="M0 24h5.835V0H0ZM11.665 0v24H17.5V0Z"
        fill={color}
      />
    </Svg>
  )
}

export default SvgComponent
