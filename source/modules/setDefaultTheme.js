import { injectGlobal } from 'styled-components'
import Typography from 'typography'

const theme = {
  baseFontSize: '20px',
  bodyFontFamily: ['Droid Sans', 'sans-serif'],
  headerFontFamily: ['Yanone Kaffeesatz', 'sans-serif'],
  headerWeight: 400,
  scaleRatio: 2.5,
  overrideStyles: ({rhythm}) => ({
    li: {
      marginBottom: 0,
    },
    '.ReactCodeMirror': {
      marginBottom: rhythm(1),
    },
  })
}

const typography = new Typography(theme)

export default () => {
  injectGlobal`
    ${typography.toString()}
    html, body, #root {
      height: 100%;
    }

    a {
      color: #F92672;
      text-decoration: none;
    }

    code {
      background: #e7e8e2;
      border-radius: 5px;
      font-family: monospace;
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
}
