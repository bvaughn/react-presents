import React, { Component } from 'react'
import { TypographyStyle, GoogleFont } from 'react-typography'
import { injectGlobal } from 'styled-components'
import Typography from 'typography'
import CodePlugin from 'typography-plugin-code'

export default class DefaultTheme extends Component {
  componentWillMount () {
    injectGlobal`${globalStyles}`
  }

  render () {
    return (
      <div>
        <TypographyStyle typography={typography} />
        <GoogleFont typography={typography} />
      </div>
    )
  }
}

const globalStyles = `
  html, body {
    height: 100%;
  }

  button {
    font-family: 'Yanone Kaffeesatz';
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #F92672;
    color: #fff;
    font-weight: 400;
    font-size: 20px;
    cursor: pointer;
  }

  button:disabled {
    background-color: #CFD8DC;
    cursor: default;
  }
`

const typography = new Typography({
  baseFontSize: '20px',
  bodyFontFamily: ['Droid Sans', 'sans-serif'],
  googleFonts: [
    {
      name: 'Droid Sans',
      styles: ['400']
    },
    {
      name: 'Yanone Kaffeesatz',
      styles: ['400']
    }
  ],
  headerFontFamily: ['Yanone Kaffeesatz', 'sans-serif'],
  headerWeight: 400,
  scaleRatio: 2.5,
  plugins: [
    new CodePlugin()
  ],
  overrideStyles: ({scale, rhythm}) => ({
    'h1,h2,h3,h4,h5,h6': {
      color: 'inherit'
    },
    p: {
      marginBottom: '0.75rem'
    },
    li: {
      marginBottom: 0
    },
    '.ReactCodeMirror': {
      marginBottom: rhythm(1)
    },
    'tt, code': {
      fontSize: '70%'
    },
    '.CodeMirror pre': {
      ...scale(-2 / 5),
      lineHeight: '1.42'
    },
    a: {
      color: '#F92672',
      textDecoration: 'none'
    }
  })
})
