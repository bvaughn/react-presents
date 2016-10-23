import { Component, PropTypes } from 'react'
import { presentationContext, slideContext } from './PropTypes'

export default class Step extends Component {
  static contextTypes = {
    presentation: presentationContext.isRequired,
    slide: slideContext.isRequired
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    exact: PropTypes.bool,
    index: PropTypes.number.isRequired
  }

  componentWillMount () {
    const { slide } = this.context
    const { index } = this.props

    slide.registerStep(index || 0)
  }

  render () {
    const { presentation } = this.context
    const { children, exact, index } = this.props

    const stepIndex = presentation.getStepIndex()

    const match = exact
      ? stepIndex === index
      : stepIndex >= index

    return match
      ? children
      : null
  }
}
