import { PropTypes } from 'react'

export const presentationContext = PropTypes.shape({
  getPatternForSlide: PropTypes.func.isRequired,
  getSlideIndex: PropTypes.func.isRequired,
  getStepIndex: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  goForward: PropTypes.func.isRequired,
  goToSlide: PropTypes.func.isRequired,
  isAtBeginning: PropTypes.func.isRequired,
  isAtEnd: PropTypes.func.isRequired
})

export const slideContext = PropTypes.shape({
  registerStep: PropTypes.func.isRequired
})
