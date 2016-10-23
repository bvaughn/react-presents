// IE 10+ compatibility for demo (must come before other imports)
import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'

import './theme.css'
import '../styles.css'

import Application from './Application'

render(
  <Application />,
  document.getElementById('root')
)
