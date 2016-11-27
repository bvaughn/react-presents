import React, { Component, PropTypes } from 'react'
import { HashRouter, Match, Redirect } from 'react-router'
import cuid from 'cuid'
import qs from 'qs'
import DefaultTheme from './DefaultTheme'
import { presentationContext } from './PropTypes'
import TouchNav from './TouchNav'

const crossWindowCallbackName = cuid()

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

    // Handle to other window containing notes
    this._notesWindowHandle = null

    // When this window is the notes window, this is the ID passed in for
    // execution by the window with the slides
    this._attachedCallbackName = ''

    this.getPatternForSlide = this.getPatternForSlide.bind(this)
    this.getSlideIndex = this.getSlideIndex.bind(this)
    this.getStepIndex = this.getStepIndex.bind(this)
    this.goBack = this.goBack.bind(this)
    this.goForward = this.goForward.bind(this)
    this.goToSlide = this.goToSlide.bind(this)
    this.showNotes = this.showNotes.bind(this)
    this.signalParent = this.signalParent.bind(this)
    this._onKeyDown = this._onKeyDown.bind(this)
  }

  componentWillMount () {
    const callbackFunc = (path) => {
      this._router.replaceWith(path)
    }

    // Detect if we are a notes window, or a slides window
    this._attachedCallbackName = qs.parse(window.location.search.slice(1)).notes
    this._isNotesWindow = !!this._attachedCallbackName

    if (!this._isNotesWindow && !window[crossWindowCallbackName]) {
      // attach a function for the notes window to call
      window[crossWindowCallbackName] = callbackFunc
    } else if (this._isNotesWindow && !window[this._attachedCallbackName]) {
      // attach a function for the parent window to call
      window[this._attachedCallbackName] = callbackFunc
    }
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

  getIndexForSlide (slide) {
    let slideIndex = -1
    Object.keys(this._slideIndexMap).some(index => {
      if (this._slideIndexMap[index] === slide) {
        slideIndex = parseInt(index, 10)
        return true
      }
      return false
    })

    return slideIndex
  }

  getSlideIndex () {
    return this._slideIndex
  }

  getStepIndex () {
    return this._stepIndex
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
      const path = this._createPath({ slideIndex, stepIndex })

      this._router.replaceWith(path)

      if (this._isNotesWindow) {
        this.signalParent(path)
      } else if (this._notesWindowHandle) {
        this.showNotes(path)
      }
    }
  }

  signalParent (path) {
    if (!window.opener) {
      return
    }
    window.opener[this._attachedCallbackName](path)
  }

  showNotes (path) {
    if (this._notesWindowHandle && !this._notesWindowHandle.closed) {
      this._notesWindowHandle[crossWindowCallbackName](path)
    } else {
      const notesUrl = new window.URL(window.location.href)

      // inject the 'notes' query string
      notesUrl.search = `?${qs.stringify(
        Object.assign(
          qs.parse(window.location.search.slice(1)),
          { notes: crossWindowCallbackName }
        )
      )}`

      this._notesWindowHandle = window.open(notesUrl.toString(), 'react-presents-notes')
    }
  }

  render () {
    const { children, disableTheme, router: Router } = this.props

    const renderedChildren = typeof children === 'function'
      ? children({ presentation: this })
      : children

    let renderedContents

    if (this._isNotesWindow) {
      renderedContents = React.Children.map(renderedChildren, child => (
        React.cloneElement(child, { showNotes: true })
      ))
    } else {
      renderedContents = renderedChildren
    }

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
              {!disableTheme && (
                <DefaultTheme />
              )}

              <Match
                exactly
                pattern='/'
                render={() => (
                  <Redirect to='/0/0' />
                )}
              />

              {renderedContents}

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
      case 's':
      case 'S':
        if (!this._isNotesWindow) {
          this.showNotes()
        }
        break
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
