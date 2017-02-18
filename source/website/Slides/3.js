import React from 'react'
import { ContentSlide, Step } from '../../modules'

const slide = ({ isPresenterMode }) => (
  <ContentSlide>
    <h1>{slide.title}</h1>
    <ul>
      <li>Slides can contain presenter notes.</li>
      <Step index={1}><li>Type "p" to open a synced presenter window</li></Step>
      <Step index={2}><li>That window and this will be synced to stay on the same page</li></Step>
    </ul>
    {isPresenterMode && (
      <em>
        <i className='fa fa-user-secret' /> It will also show upcoming slide steps and presenter-only notes (like this one).
      </em>
    )}
  </ContentSlide>
)

slide.title = 'Presenter notes'

export default slide
