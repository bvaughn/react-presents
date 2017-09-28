import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import { HashRouter, Route } from 'react-router-dom'
import DefaultTheme from './DefaultTheme'
import { presentationContext } from './PropTypes'
import TouchNav from './TouchNav'

export default class Presentation extends Component {
  static defaultProps = {
    disableTheme: false,
    router: HashRouter
  };

  static propTypes = {
    children: PropTypes.any.isRequired,
    disableTheme: PropTypes.bool.isRequired,
    router: PropTypes.any.isRequired
  };

  render () {
    const { router: Router } = this.props

    return (
      <Router>
        <PresentationInner {...this.props} />
      </Router>
    )
  }
}

// Separate inner class due to Router context dependencies.
class PresentationInner extends Component {
  static childContextTypes = {
    pluginProps: PropTypes.object.isRequired,
    presentation: presentationContext.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    children: PropTypes.any.isRequired,
    disableTheme: PropTypes.bool.isRequired
  };

  constructor (props, context) {
    super(props, context)

    this.state = {
      pluginProps: {}
    }

    this._index = 0
    this._slideIndex = 0
    this._slideIndexMap = {}
    this._stepIndex = 0

    this.getSlideIndex = this.getSlideIndex.bind(this)
    this.getSlideMetadata = this.getSlideMetadata.bind(this)
    this.getStepIndex = this.getStepIndex.bind(this)
    this.goBack = this.goBack.bind(this)
    this.goForward = this.goForward.bind(this)
    this.goToSlide = this.goToSlide.bind(this)
    this.setPluginProps = this.setPluginProps.bind(this)
    this._onKeyDown = this._onKeyDown.bind(this)
  }

  componentDidMount () {
    document.body.addEventListener('keydown', this._onKeyDown)
  }

  componentWillMount () {
    this._parseLocation(window.location)
  }

  componentWillUnmount () {
    document.body.removeEventListener('keydown', this._onKeyDown)
  }

  componentWillUpdate (nextProps, nextState) {
    this._parseLocation(window.location)
  }

  getChildContext () {
    const { pluginProps } = this.state

    return {
      pluginProps,
      presentation: this
    }
  }

  getSlideIndex () {
    return this._slideIndex
  }

  getSlideMetadata (slide) {
    const slideIndex = this._index

    this._slideIndexMap[slideIndex] = slide
    this._index++

    const path = this._createPath({ slideIndex })

    return {
      path,
      slideIndex
    }
  }

  getStepIndex () {
    return this._stepIndex
  }

  goBack () {
    let slideIndex = this._slideIndex
    let stepIndex = this._stepIndex

    if (stepIndex > 0) {
      this.goToSlide({
        slideIndex,
        stepIndex: stepIndex - 1
      })
    } else if (slideIndex > 0) {
      slideIndex--

      // Ensure this slide has been processed at least once so we can accurately access the step-count
      this.goToSlide({
        slideIndex
      })

      stepIndex = this._getNumStepsForSlide(slideIndex) - 1

      this.goToSlide({
        slideIndex,
        stepIndex
      })
    }
  }

  goForward () {
    let slideIndex = this._slideIndex
    let stepIndex = this._stepIndex

    const numCurrentSlideSteps = this._getNumStepsForSlide(slideIndex)
    const numSlides = Object.keys(this._slideIndexMap).length

    if (stepIndex + 1 < numCurrentSlideSteps) {
      stepIndex++
    } else if (slideIndex + 1 < numSlides) {
      slideIndex++
      stepIndex = 0
    }

    this.goToSlide({ slideIndex, stepIndex })
  }

  goToSlide ({ slideIndex, stepIndex = 0 }) {
    if (
      slideIndex !== this._slideIndex ||
      stepIndex !== this._stepIndex
    ) {
      const { router } = this.context
      const path = this._createPath({ slideIndex, stepIndex })

      if (typeof router.replace === 'function') {
        router.replace(path) // react-router@4.0.0-beta.6
      } else {
        router.history.replace(path) // react-router@4.0.0
      }

      this.forceUpdate()
    }
  }

  isAtBeginning () {
    return (
      this._slideIndex === 0 &&
      this._stepIndex === 0
    )
  }

  isAtEnd () {
    const numSlides = Object.keys(this._slideIndexMap).length
    const numLastSlideSteps = this._getNumStepsForSlide(numSlides - 1)

    return (
      this._slideIndex === numSlides - 1 &&
      this._stepIndex === numLastSlideSteps - 1
    )
  }

  setPluginProps (props) {
    const { pluginProps } = this.state

    this.setState({
      pluginProps: {
        ...pluginProps,
        ...props
      }
    })
  }

  render () {
    const { children, disableTheme } = this.props

    return (
      <div
        style={{
          height: '100%',
          width: '100%'
        }}
      >
        {!disableTheme && (
          <DefaultTheme />
        )}

        <Route
          exact
          path='/'
          render={() => (
            <Redirect to='/0/0' />
          )}
        />

        {typeof children === 'function'
          ? children({ presentation: this })
          : children
        }

        <TouchNav />
      </div>
    )
  }

  _createPath ({
    slideIndex,
    stepIndex = ':step'
  }) {
    return `/${slideIndex}/${stepIndex}`
  }

  _getNumStepsForSlide (slideIndex) {
    return this._slideIndexMap[slideIndex].getNumSteps() || 1
  }

  _parseLocation (location) {
    const parsed = (location.pathname + location.hash).match(/(\d+)\/(\d+)/)

    if (parsed) {
      this._slideIndex = parseInt(parsed[1], 10)
      this._stepIndex = parseInt(parsed[2], 10)
    } else {
      this._slideIndex = 0
      this._stepIndex = 0
    }
  }

  _onKeyDown (event) {
    // Ignore keyboard events if the user is entering text
    // Or interacting with form controls.
    if (
      event.target.tagName === 'INPUT' ||
      event.target.tagName === 'SELECT' ||
      event.target.tagName === 'TEXTAREA' ||
      event.target.isContentEditable === true
    ) {
      return
    }

    switch (event.key) {
      case 'ArrowLeft':
      case 'PageUp':
        this.goBack()
        break
      case 'ArrowRight':
      case 'PageDown':
      case 'Enter':
      case ' ':
        this.goForward()
        break
      default:
        // Linting requires this :)
        break
    }
  }
}
