import * as React from 'react'
import Svg, { G, Path } from 'react-native-svg'

const SvgComponent = (props) => {
  const { width = 20.115, height = 20.115, color = '#fff' } = props
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
    >
      <G
        data-name="Icon feather-plus-circle"
        fill="none"
        scale={width / 25}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path
          scale={width / 25}
          data-name="Path 3183"
          d="M19.615 10.058A9.558 9.558 0 1 1 10.058.5a9.558 9.558 0 0 1 9.557 9.558Z"
        />
        <Path
          scale={width / 25}
          data-name="Path 3184"
          d="M10.058 6.235v7.646"
          strokeWidth={2}
        />
        <Path
          scale={width / 25}
          data-name="Path 3185"
          d="M6.235 10.058h7.646"
          strokeWidth={2}
        />
      </G>
    </Svg>
  )
}

export default SvgComponent
