import React, { Component, PropTypes } from 'react'
import { Match } from 'react-router'
import { presentationContext, slideContext } from './PropTypes'

export default class Slide extends Component {
  static childContextTypes = {
    slide: slideContext.isRequired
  };

  static contextTypes = {
    presentation: presentationContext.isRequired
  };

  static propTypes = {
    component: PropTypes.any,
    render: PropTypes.any
  };

  constructor (props, context) {
    super(props, context)

    this._stepIndex = 0

    this._renderComponent = this._renderComponent.bind(this)
  }

  componentWillMount () {
    const { presentation } = this.context

    this._pattern = presentation.getPatternForSlide(this)
  }

  componentWillUnmount () {
    this._stepIndex = 0
  }

  getChildContext () {
    return {
      slide: this
    }
  }

  getNumSteps () {
    return this._numSteps || this._stepIndex + 1
  }

  registerStep (index) {
    this._stepIndex = Math.max(this._stepIndex, index)
  }

  render () {
    return (
      <Match
        pattern={this._pattern}
        render={this._renderComponent}
      />
    )
  }

  setNumSteps (numSteps: number) {
    this._numSteps = numSteps
  }

  _renderComponent () {
    const { presentation } = this.context
    const { component: Component, render } = this.props

    const stepIndex = presentation.getStepIndex()

    return typeof render === 'function'
      ? render({ stepIndex })
      : <Component stepIndex={stepIndex} />
  }
}
