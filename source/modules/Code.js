import React, { Component, PropTypes } from 'react'
import CodeMirror from 'react-codemirror'

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
  }

  static propTypes = {
    codeMirrorOptions: PropTypes.object.isRequired,
    dimLines: PropTypes.array.isRequired,
    highlightLines: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired
  }

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
    const { codeMirrorOptions, value } = this.props

    const options = {
      ...DEFAULT_CODE_MIRROR_OPTIONS,
      ...codeMirrorOptions
    }

    return (
      <CodeMirror
        options={options}
        ref={(ref) => {
          this._codeMirror = ref
        }}
        value={value}
      />
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
