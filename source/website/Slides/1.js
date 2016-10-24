import React from 'react'
import { ContentSlide, Step } from '../../modules'

const slide = () => (
  <ContentSlide>
    <h1>{slide.title}</h1>
    <ul>
      <li>Slides can contain multiple steps.</li>
      <Step index={1} exact><li>Sub-text can appear only for a specific step</li></Step>
      <Step index={2}><li>Or it can be additive</li></Step>
      <Step index={3}><li>(By default it is additive)</li></Step>
    </ul>
  </ContentSlide>
)

slide.title = 'A simple slide'

export default slide
