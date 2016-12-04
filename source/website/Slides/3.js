import React from 'react'
import { ContentSlide, Step } from '../../modules'

const slide = ({ isPresenterMode }) => (
  <ContentSlide>
    <h1>{slide.title}</h1>
    {isPresenterMode && (
      <em>
        <i className='fa fa-user-secret' /> This sentence (and the grayed-out bullet points below) are only visible to the presenter.
      </em>
    )}
    <ul>
      <li>Slides can contain presenter notes.</li>
      <Step index={1}><li>Type "p" to open a synced presenter window</li></Step>
      <Step index={2}><li>That window and this will be synced to stay on the same page</li></Step>
    </ul>
  </ContentSlide>
)

slide.title = 'Presenter notes'

export default slide
