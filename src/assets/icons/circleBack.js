import * as React from 'react'
import Svg, { G, Path } from 'react-native-svg'

const SvgComponent = (props) => {
  const { width = 29.25, height = 29.25, color = '#fff' } = props
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
    >
      <G
        scale={width / 29}
        data-name="Icon ionic-ios-arrow-dropleft"
        fill={color}
      >
        <Path
          scale={width / 29}
          data-name="Path 3175"
          d="M17.81 7.003a1.362 1.362 0 0 0-1.92 0l-6.708 6.729a1.356 1.356 0 0 0-.042 1.87l6.609 6.63a1.355 1.355 0 1 0 1.92-1.912l-5.61-5.695 5.759-5.7a1.356 1.356 0 0 0-.008-1.922Z"
        />
        <Path
          data-name="Path 3176"
          d="M14.625 0A14.625 14.625 0 1 0 29.25 14.625 14.623 14.623 0 0 0 14.625 0Zm8.747 23.372A12.37 12.37 0 1 1 5.878 5.878a12.37 12.37 0 1 1 17.494 17.494Z"
        />
      </G>
    </Svg>
  )
}

export default SvgComponent
