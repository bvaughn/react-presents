Getting started
---------------

Install `react-presents` using npm.

```shell
npm install react-presents --save
```

ES6, CommonJS, and UMD builds are available with each distribution.
For example:

```js
// Import the components you want like so:
import { Presentation, Slide } from 'react-presents'
```

Alternately you can load a global-friendly UMD build which exposes a global `ReactPresents` object:

```html
<script src="path/to/react-presents/dist/umd/react-presents.js"></script>
```

Now you're ready to start using the components.

Example Usage
---------

```jsx
// Example of using Webpack to bulk-load slides:
const slides = require.context('./Slides/', false, /\.js$/)
  .keys()
  .map((filename) => filename.replace('./', ''))
  .map((filename) => require(`./Slides/${filename}`).default)

// Example of supporting jump-to-sides via a drop-down menu:
const options = slides
  .map((slide, index) => ({
    label: slide.title,
    value: index
  }))
  .filter((option) => option.label)

// Example of rendering all of your slides in the order they loaded:
import React from 'react'
import { Presentation, Slide } from 'react-presents'
export default () => (
  <Presentation>
    {slides.map((Component, index) => (
      <Slide
        component={Component}
        key={index}
      />
    )).concat(
      <DropDownNav
        key='DropDownNav'
        options={options}
      />
    )}
  </Presentation>
)

// Example of a slide:
import React from 'react'
import { Step } from 'react-presents'
export default () => (
  <div>
    <h1>A simple slide</h1>
    <ul>
      <li>Slides can contain multiple steps.</li>
      <Step index={1} exact><li>Sub-text can appear only for a specific step</li></Step>
      <Step index={2}><li>Or it can be additive</li></Step>
      <Step index={3}><li>(By default it is additive)</li></Step>
    </ul>
  </div>
)

// Example of a slide with a DropDownNav title:
import React from 'react'
import { Code, ContentSlide } from '../../modules'
const slide = ({ stepIndex }) => (
  <ContentSlide>
    <h1>Syntax highlighting</h1>
    <p>Slides can also contain syntax highlighting:</p>
    <Code
      dimLines={[[0,1]]}
      highlightLines={[[3,5]]}
      value={require('raw!path/to/code.js')}
    />
  </ContentSlide>
)

slide.title = 'Syntax highlighting'

export default slide

// To disable the default theme use the :disableTheme property:
```jsx
<Presentation disableTheme>
  {slides}
</Presentation>
```

```

License
---------

*react-presents* is available under the MIT License.
