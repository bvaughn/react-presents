import PropTypes from 'prop-types'

export const presentationContext = PropTypes.shape({
  getSlideIndex: PropTypes.func.isRequired,
  getSlideMetadata: PropTypes.func.isRequired,
  getStepIndex: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  goForward: PropTypes.func.isRequired,
  goToSlide: PropTypes.func.isRequired,
  isAtBeginning: PropTypes.func.isRequired,
  isAtEnd: PropTypes.func.isRequired,
  setPluginProps: PropTypes.func.isRequired
})

export const slideContext = PropTypes.shape({
  getNumSteps: PropTypes.func.isRequired,
  registerStep: PropTypes.func.isRequired,
  setNumSteps: PropTypes.func.isRequired
})
