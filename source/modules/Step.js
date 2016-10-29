import { Component, PropTypes } from 'react'
import { presentationContext, slideContext } from './PropTypes'

export default class Step extends Component {
  static contextTypes = {
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
    const { presentation } = this.context
    const { children, exact, index, maxIndex } = this.props

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

    return match
      ? children
      : null
  }
}
