import React, { Component } from 'react'
import styled from 'styled-components'
import { presentationContext } from './PropTypes'

const ButtonGroup = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;

  @media (max-width: 600px) {
    top: 0.5rem;
    right: 0.5rem;
  }
`
const Button = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
  padding: 0;
  background: rgba(124, 124, 124, 0.25);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
`
const Path = styled.path`
  fill: #fff;
`

export default class TouchNav extends Component {
  static contextTypes = {
    presentation: presentationContext.isRequired
  };

  render () {
    const { presentation } = this.context

    return (
      <ButtonGroup>
        <Button onClick={presentation.goBack}>
          <IconLeft />
        </Button>
        <Button onClick={presentation.goForward}>
          <IconRight />
        </Button>
      </ButtonGroup>
    )
  }
}

function SvgWrapper ({ children, ...rest }) {
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

function IconLeft () {
  return (
    <SvgWrapper>
      <Path d='M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z' />
    </SvgWrapper>
  )
}

function IconRight () {
  return (
    <SvgWrapper>
      <Path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' />
    </SvgWrapper>
  )
}
