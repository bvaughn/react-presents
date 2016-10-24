import React from 'react'
import { TitleSlide } from '../../modules'

const slide = () => (
  <TitleSlide>
    <h1 style={{color: 'white'}}>React Presents: a slideshow framework</h1>
    <h2><i className='fa fa-github' /> <a href='https://github.com/bvaughn/react-presents'>github.com/bvaughn/react-presents</a></h2>
    <p>(Use the right and left arrow keys to navigate)</p>
  </TitleSlide>
)

slide.title = 'Title Slide'

export default slide
