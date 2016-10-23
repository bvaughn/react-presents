import React from 'react'
import { Presentation, Slide } from '../modules'
import './Application.css'

// Load all slides in the Slides folder
const slides = require.context('./Slides/', false, /\.js$/)
  .keys()
  .map((filename) => filename.replace('./', ''))
  .map((filename) => require(`./Slides/${filename}`).default)

export default () => (
  <Presentation>
    {slides.map((Component, index) => (
      <Slide
        component={Component}
        key={index}
      />
    ))}
  </Presentation>
)
