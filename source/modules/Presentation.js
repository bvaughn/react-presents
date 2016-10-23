import React, { Component, PropTypes } from 'react'
import { HashRouter, Match, Redirect } from 'react-router'
import { presentationContext } from './PropTypes'
import TouchNav from './TouchNav'
import setDefaultTheme from './setDefaultTheme'

export default class Presentation extends Component {
  static childContextTypes = {
    presentation: presentationContext.isRequired
  };

  static defaultProps = {
    disableTheme: false,
    router: HashRouter
  };

  static propTypes = {
    children: PropTypes.any.isRequired,
    disableTheme: PropTypes.bool.isRequired,
    router: PropTypes.any.isRequired
  };

  constructor (props, context) {
    super(props, context)

    this._index = 0
    this._slideIndex = 0
    this._slideIndexMap = {}
    this._stepIndex = 0

    if (props.disableTheme !== true) {
      setDefaultTheme()
    }

    this.getPatternForSlide = this.getPatternForSlide.bind(this)
    this.getSlideIndex = this.getSlideIndex.bind(this)
    this.getStepIndex = this.getStepIndex.bind(this)
    this.goBack = this.goBack.bind(this)
    this.goForward = this.goForward.bind(this)
    this.goToSlide = this.goToSlide.bind(this)
    this._onKeyDown = this._onKeyDown.bind(this)
  }

  componentDidMount () {
    document.body.addEventListener('keydown', this._onKeyDown)
  }

  componentWillUnmount () {
    document.body.removeEventListener('keydown', this._onKeyDown)
  }

  getChildContext () {
    return {
      presentation: this
    }
  }

  getPatternForSlide (slide) {
    const slideIndex = this._index

    this._slideIndexMap[slideIndex] = slide
    this._index++

    return this._createPath({ slideIndex })
  }

  getSlideIndex () {
    return this._slideIndex
  }

  getStepIndex () {
    return this._stepIndex
  }

  goBack () {
    let slideIndex = this._slideIndex
    let stepIndex = this._stepIndex

    if (stepIndex > 0) {
      stepIndex--
    } else if (slideIndex > 0) {
      slideIndex--
      stepIndex = this._getNumStepsForSlide(slideIndex) - 1
    }

    this.goToSlide({ slideIndex, stepIndex })
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
      const path = this._createPath({ slideIndex, stepIndex })

      this._router.replaceWith(path)
    }
  }

  render () {
    const { children, router: Router } = this.props

    return (
      <Router>
        {({ location, router }) => {
          this._router = router
          this._parseLocation(location)

          return (
            <div
              style={{
                height: '100%',
                width: '100%'
              }}
            >
              <Match
                exactly
                pattern='/'
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
        }}
      </Router>
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
    const parsed = location.pathname.match(/(\d+)\/(\d+)/)

    if (parsed) {
      this._slideIndex = parseInt(parsed[1], 10)
      this._stepIndex = parseInt(parsed[2], 10)
    } else {
      this._slideIndex = 0
      this._stepIndex = 0
    }
  }

  _onKeyDown (event) {
    if (event.target.tagName === 'INPUT') {
      return
    }

    switch (event.key) {
      case 'ArrowLeft':
        this.goBack()
        break
      case 'ArrowRight':
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
