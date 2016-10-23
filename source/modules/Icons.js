import React from 'react'
import styled from 'styled-components'

const Path = styled.path`
  fill: currentColor;
`

export function SvgIconWrapper ({ children, ...rest }) {
  return (
    <svg
      height={24}
      preserveAspectRatio='xMinYMax meet'
      viewBox='0 0 24 24'
      width={24}
      {...rest}
    >
      <path d='M0-.5h24v24H0z' fill='none' />
      {children}
    </svg>
  )
}

export function IconLeft () {
  return (
    <SvgIconWrapper>
      <Path d='M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z' />
    </SvgIconWrapper>
  )
}

export function IconMore () {
  return (
    <SvgIconWrapper>
      <Path d='M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' />
    </SvgIconWrapper>
  )
}

export function IconRight () {
  return (
    <SvgIconWrapper>
      <Path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' />
    </SvgIconWrapper>
  )
}
