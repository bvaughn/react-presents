import { PropTypes } from 'react'

export const presentationContext = PropTypes.shape({
  getPatternForSlide: PropTypes.func.isRequired,
  getStepIndex: PropTypes.func.isRequired
})

export const slideContext = PropTypes.shape({
  registerStep: PropTypes.func.isRequired
})
