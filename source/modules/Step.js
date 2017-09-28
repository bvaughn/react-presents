import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { presentationContext, slideContext } from './PropTypes'

export default class Step extends Component {
  static contextTypes = {
    pluginProps: PropTypes.object.isRequired,
    presentation: presentationContext.isRequired,
    slide: slideContext.isRequired
  };

  static defaultProps = {
    maxIndex: Infinity
  };

  static propTypes = {
    children: PropTypes.node.isRequired,
    exact: PropTypes.bool,
    index: PropTypes.number.isRequired,
    maxIndex: PropTypes.number.isRequired
  };

  componentWillMount () {
    const { slide } = this.context
    const { index, maxIndex } = this.props

    if (maxIndex < Infinity) {
      slide.registerStep(maxIndex)
    } else {
      slide.registerStep(index)
    }
  }

  render () {
    const { pluginProps, presentation } = this.context
    const { children, exact, index, maxIndex } = this.props

    const { isPresenterMode } = pluginProps
    const stepIndex = presentation.getStepIndex()

    let match

    if (exact) {
      match = stepIndex === index
    } else {
      match = (
        stepIndex >= index &&
        stepIndex <= maxIndex
      )
    }

    if (match) {
      return children
    } else if (isPresenterMode) {
      return (
        <div style={{ opacity: 0.35 }}>
          {children}
        </div>
      )
    } else {
      return null
    }
  }
}
