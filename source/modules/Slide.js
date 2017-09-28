import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { presentationContext, slideContext } from './PropTypes'

export default class Slide extends Component {
  static childContextTypes = {
    slide: slideContext.isRequired
  };

  static contextTypes = {
    pluginProps: PropTypes.object.isRequired,
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
    const { path, slideIndex } = presentation.getSlideMetadata(this)

    this._path = path
    this._slideIndex = slideIndex
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
      <Route
        exact
        path={this._path}
        render={this._renderComponent}
      />
    )
  }

  setNumSteps (numSteps: number) {
    this._numSteps = numSteps
  }

  _renderComponent () {
    const { pluginProps, presentation } = this.context
    const { component: Component, render } = this.props

    const { isPresenterMode } = pluginProps

    const slideIndex = this._slideIndex
    const stepIndex = presentation.getStepIndex()

    let rendered

    if (typeof render === 'function') {
      rendered = render({ isPresenterMode, slideIndex, stepIndex })
    } else {
      rendered = (
        <Component
          isPresenterMode={isPresenterMode}
          slideIndex={slideIndex}
          stepIndex={stepIndex}
        />
      )
    }

    return (
      <ThemeProvider theme={{ isPresenterMode }}>
        {rendered}
      </ThemeProvider>
    )
  }
}
