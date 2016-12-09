import cuid from 'cuid'
import qs from 'qs'
import { Component } from 'react'
import { presentationContext } from './PropTypes'

const parentWindowID = cuid()

export default class PresenterModePlugin extends Component {
  static contextTypes = {
    presentation: presentationContext.isRequired
  };

  constructor (props, context) {
    super(props, context)

    // Parent of presenter window; null if not presenter window
    this._parentWindowID = null

    // Handle to other window containing presenter notes; null if presenter window
    this._presenterWindow = null

    this._onKeyDown = this._onKeyDown.bind(this)
    this._signalParent = this._signalParent.bind(this)
    this._togglePresenterMode = this._togglePresenterMode.bind(this)
  }

  componentDidMount () {
    document.body.addEventListener('keydown', this._onKeyDown)
  }

  componentWillMount () {
    const { presentation } = this.context

    // Detect if we are the presenter window or a original
    this._parentWindowID = qs.parse(window.location.search.slice(1)).parentWindowID

    presentation.setPluginProps({
      isPresenterMode: !!this._parentWindowID
    })

    const callback = ({ slideIndex, stepIndex }) => {
      presentation.goToSlide({ slideIndex, stepIndex })
    }

    // Expose the router to the alternate window
    if (
      !this._parentWindowID &&
      !window[parentWindowID]
    ) {
      window[parentWindowID] = callback
    } else if (
      this._parentWindowID &&
      !window[this._parentWindowID]
    ) {
      window[this._parentWindowID] = callback
    }
  }

  componentWillUnmount () {
    document.body.removeEventListener('keydown', this._onKeyDown)
  }

  componentWillUpdate (nextProps, nextState, nextContext) {
    const { presentation } = this.context

    const slideIndex = presentation.getSlideIndex()
    const stepIndex = presentation.getStepIndex()

    if (
      slideIndex !== this._slideIndex ||
      stepIndex !== this._stepIndex
    ) {
      this._slideIndex = slideIndex
      this._stepIndex = stepIndex

      if (this._parentWindowID) {
        this._signalParent({ slideIndex, stepIndex })
      } else if (this._presenterWindow) {
        this._syncPath({ slideIndex, stepIndex })
      }
    }
  }

  render () {
    return null
  }

  _onKeyDown (event) {
    if (event.target.tagName === 'INPUT') {
      return
    }

    switch (event.key) {
      case 'p':
      case 'P':
        if (!this._parentWindowID) {
          this._togglePresenterMode()
        }
        break
      default:
        // Linting requires this :)
        break
    }
  }

  _signalParent (path) {
    if (window.opener) {
      if (typeof window.opener[this._parentWindowID] !== 'function') {
        // When hot reloading updates slides, presenter mode gets disconnected.
        // In this case we should close the secondary/presenter slide.
        window.close()
      } else if (window.opener) {
        // Otherwise, sync route changes between windows.
        window.opener[this._parentWindowID](path)
      }
    }
  }

  _togglePresenterMode (path) {
    if (this._presenterWindow) {
      this._presenterWindow.close()
      this._presenterWindow = null
    } else {
      const url = new window.URL(window.location.href)

      // Inject the 'parentWindowID' query string
      url.search = `?${qs.stringify(
        Object.assign(
          qs.parse(window.location.search.slice(1)),
          { parentWindowID }
        )
      )}`

      this._presenterWindow = window.open(
        url.toString(),
        'react-presents-notes'
      )
    }
  }

  _syncPath (path) {
    if (
      this._presenterWindow &&
      !this._presenterWindow.closed
    ) {
      this._presenterWindow[parentWindowID](path)
    }
  }
}
