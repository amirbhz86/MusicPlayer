import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

const SvgComponent = (props) => {
  const { color = '#fe5ab2', width = 18, height = 22 } = props
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
    >
      <Path
        data-name="Icon material-delete"
        d="M1.286 19.556A2.518 2.518 0 0 0 3.857 22h10.286a2.518 2.518 0 0 0 2.571-2.444V4.889H1.286ZM18 1.222h-4.5L12.214 0H5.786L4.5 1.222H0v2.445h18Z"
        fill={color}
      />
    </Svg>
  )
}

export default SvgComponent
