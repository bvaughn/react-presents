import React from 'react'
import { TitleSlide } from '../../modules'

const slide = () => (
  <TitleSlide>
    <h1>{slide.title}</h1>
    <p>Check back soon for more updates and components.</p>
    <p>File bugs and issues here <i className='fa fa-github' /> <a href='https://github.com/bvaughn/react-presents'>github.com/bvaughn/react-presents</a></p>
  </TitleSlide>
)

slide.title = 'Thanks for reading!'

export default slide
