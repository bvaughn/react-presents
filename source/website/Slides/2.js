import React from 'react'
import { Code, ContentSlide, Step } from '../../modules'

const code = require('raw!../../../examples/render-function.js')
const dimLines = {
  3: [[0, 1], [5, 6]]
}
const highlightLines = {
  4: [[0, 0], [2, 2]]
}

const slide = ({ stepIndex }) => (
  <ContentSlide>
    <h1>{slide.title}</h1>
    <p>Slides can also contain syntax highlighting:</p>
    <Step index={1}>
      <Code
        dimLines={dimLines[stepIndex]}
        highlightLines={highlightLines[stepIndex]}
        value={code}
      />
    </Step>
    <Step index={2}>
      <p>This is handled by <code>CodeMirror</code> but with a few convenience features:</p>
    </Step>
    <ul>
      <Step index={3}><li>Such as dimming specified lines:</li></Step>
      <Step index={4}><li>Or highlighting them:</li></Step>
    </ul>
  </ContentSlide>
)

slide.title = 'Syntax highlighting'

export default slide
