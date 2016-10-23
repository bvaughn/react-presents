import React, { Component } from 'react'
import styled from 'styled-components'
import IconButton from './IconButton'
import { IconLeft, IconRight } from './Icons'
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

export default class TouchNav extends Component {
  static contextTypes = {
    presentation: presentationContext.isRequired
  };

  render () {
    const { presentation } = this.context

    return (
      <ButtonGroup>
        <IconButton
          disabled={presentation.isAtBeginning()}
          onClick={presentation.goBack}
        >
          <IconLeft />
        </IconButton>
        <IconButton
          disabled={presentation.isAtEnd()}
          onClick={presentation.goForward}
        >
          <IconRight />
        </IconButton>
      </ButtonGroup>
    )
  }
}
