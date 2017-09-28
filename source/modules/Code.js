import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CodeMirror from 'react-codemirror'
import styled from 'styled-components'

// By default, highlight JSX
import 'codemirror/mode/jsx/jsx'

const DEFAULT_CODE_MIRROR_OPTIONS = {
  lineNumbers: false,
  mode: 'jsx',
  readOnly: true,
  theme: 'reactpresents'
}

export default class Code extends Component {
  static defaultProps = {
    codeMirrorOptions: {},
    dimLines: [],
    highlightLines: []
  };

  static propTypes = {
    className: PropTypes.object,
    codeMirrorOptions: PropTypes.object.isRequired,
    dimLines: PropTypes.array.isRequired,
    highlightLines: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired
  };

  componentDidMount () {
    const { dimLines, highlightLines } = this.props

    this._textMarks = []
    this._addClassNameToLines(dimLines, 'dim')
    this._addClassNameToLines(highlightLines, 'highlight')
  }

  componentWillUpdate (nextProps, nextState) {
    const { dimLines, highlightLines } = this.props

    if (
      dimLines !== nextProps.dimLines ||
      highlightLines !== nextProps.highlightLines
    ) {
      this._textMarks.forEach(
        (textMark) => {
          textMark.clear()
        }
      )

      this._textMarks = []
      this._addClassNameToLines(nextProps.dimLines, 'dim')
      this._addClassNameToLines(nextProps.highlightLines, 'highlight')
    }
  }

  render () {
    const { codeMirrorOptions, value, className } = this.props

    const options = {
      ...DEFAULT_CODE_MIRROR_OPTIONS,
      ...codeMirrorOptions
    }

    return (
      <CodeMirrorTheme className={className}>
        <CodeMirror
          options={options}
          ref={(ref) => {
            this._codeMirror = ref
          }}
          value={value}
        />
      </CodeMirrorTheme>
    )
  }

  _addClassNameToLines (lineNumbers, className) {
    lineNumbers.forEach(([start, stop]) => {
      this._textMarks.push(
        this._codeMirror.codeMirror.doc.markText(
          { line: start, ch: 0 },
          { line: stop + 1, ch: 0 },
          { className }
        )
      )
    })
  }
}

const CodeMirrorTheme = styled.div`
.cm-s-reactpresents.CodeMirror {
  height: auto;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: #222 !important;
  color: #f8f8f2 !important;
  font-size: 12px;
  border: none;
}

.cm-s-reactpresents.CodeMirror-focused div.CodeMirror-selected {
  background: rgba(255, 255, 255, 0.10);
}

.cm-s-reactpresents {
  .CodeMirror-sizer {
    min-height: auto !important;
  }

  .CodeMirror-gutters {
    background-color: #222 !important;
    color: #f8f8f2 !important;
    font-size: 12px;
    border: none;
  }
  .CodeMirror-gutters { color: #222; }
  .CodeMirror-cursor { border-left: solid thin #ddd; }
  .CodeMirror-linenumber { cololibr: #75715e; }
  .CodeMirror-line::selection,
  .CodeMirror-line > span::selection,
  .CodeMirror-line > span > span::selection {
    background: rgba(255, 255, 255, 0.10);
  }
  .CodeMirror-line::-moz-selection,
  .CodeMirror-line > span::-moz-selection,
  .CodeMirror-line > span > span::-moz-selection {
    background: rgba(255, 255, 255, 0.10);
  }
  span.cm-comment { color: #75715e; }
  span.cm-string,
  span.cm-string-2 { color: #f1fa8c; }
  span.cm-number { color: #bd93f9; }
  span.cm-variable { color: #ddd; }
  span.cm-variable-2 { color: white; }
  span.cm-def { color: #a6e22e; }
  span.cm-keyword { color: #f92672; }
  span.cm-operator { color: #f92672; }
  span.cm-keyword { color: #f92672; }
  span.cm-atom { color: #bd93f9; }
  span.cm-meta { color: #f8f8f2; }
  span.cm-tag { color: #f92672; }
  span.cm-attribute { color: #ddd; }
  span.cm-qualifier { color: #a6e22e; }
  span.cm-property { color: #66d9ef; }
  span.cm-builtin { color: #a6e22e; }
  span.cm-variable-3 { color: #a6e22e; }

  .CodeMirror-activeline-background { background: rgba(255,255,255,0.1); }
  .CodeMirror-matchingbracket { text-decoration: underline; color: white !important; }

  span.cm-bracket { color: #900; }

  span.dim {
    opacity: 0.5;
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
  }

  span.highlight {
    background-color: rgba(189,147,249, .2);
  }
}
`
