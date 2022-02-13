import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

const SvgComponent = (props) => {
  const { color } = props
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18.07}
      height={18.07}
      {...props}
    >
      <Path
        data-name="Icon ionic-ios-add"
        d="M16.945 7.91H10.16V1.125a1.125 1.125 0 0 0-2.25 0V7.91H1.125a1.125 1.125 0 0 0 0 2.25H7.91v6.785a1.125 1.125 0 0 0 2.25 0V10.16h6.785a1.125 1.125 0 0 0 0-2.25Z"
        fill={color}
      />
    </Svg>
  )
}
export default SvgComponent
