Getting started
---------------

Install `react-presents` using npm.

```shell
npm install react-presents --save
```

ES6, CommonJS, and UMD builds are available with each distribution.
For example:

```js
// If you want the custom CodeMirror theme, include the styles:
import 'react-presents/dist/styles.css'

// Then you can import the components you want like so:
import { Presentation, Slide } from 'react-presents'
```

Alternately you can load a global-friendly UMD build:

```html
<link rel="stylesheet" href="path/to/react-presents/dist/styles.css">
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
    ))}
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
```

License
---------

*react-presents* is available under the MIT License.
