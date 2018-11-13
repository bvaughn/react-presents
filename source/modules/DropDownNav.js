import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-virtualized-select'
import { findDOMNode } from 'react-dom'
import styled from 'styled-components'
import IconButton from './IconButton'
import { IconMore } from './Icons'
import { presentationContext } from './PropTypes'
import ReactSelectStyles from './reactSelectStyles'

// @TODO Maybe register with Presentation and include via TouchNav?
const ButtonGroup = styled.div`
  position: absolute;
  top: 1rem;
  right: 7rem;

  @media (max-width: 600px) {
    top: 0.5rem;
    right: 6.5rem;
  }
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .5);
`

const SelectWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, .1);
  padding: 1rem;
  border-radius: 0.5rem;
  z-index: 2;

  .VirtualizedSelect {
    width: 250px;
    max-width: 100%;
  }
`

const Row = styled.div`
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
`

export default class NavigateToSlide extends Component {
  static contextTypes = {
    presentation: presentationContext.isRequired
  };

  static propTypes = {
    options: PropTypes.array.isRequired
  };

  constructor (props, context) {
    super(props, context)

    this.state = {
      active: false
    }

    this._onChange = this._onChange.bind(this)
    this._onClick = this._onClick.bind(this)
    this._onKeyDown = this._onKeyDown.bind(this)
    this._optionRenderer = this._optionRenderer.bind(this)
  }

  componentDidMount () {
    document.body.addEventListener('click', this._onClick)
  }

  componentWillUnmount () {
    document.body.removeEventListener('click', this._onClick)
  }

  render () {
    const { slideIndex } = this.context
    const { options } = this.props
    const { active } = this.state

    if (active) {
      return (
        <Fragment>
          <ReactSelectStyles />
          <Overlay>
            <SelectWrapper>
              <Select
                autofocus
                className='VirtualizedSelect'
                clearable={false}
                options={options}
                onChange={this._onChange}
                onInputKeyDown={this._onKeyDown}
                optionHeight={35}
                optionRenderer={this._optionRenderer}
                ref={(ref) => {
                  this._select = ref
                }}
                value={slideIndex}
              />
            </SelectWrapper>
          </Overlay>
        </Fragment>
      )
    } else if (options.length) {
      return (
        <ButtonGroup>
          <IconButton onClick={() => this.setState({ active: true })}>
            <IconMore />
          </IconButton>
        </ButtonGroup>
      )
    } else {
      return null
    }
  }

  _onChange (option) {
    const slideIndex = option.value

    const { presentation } = this.context

    this.setState({
      active: false
    })

    presentation.goToSlide({ slideIndex })
  }

  _onClick (event) {
    const { active } = this.state

    if (!active) {
      return
    }

    const select = findDOMNode(this._select)

    if (
      select === event.target ||
      select.contains(event.target)
    ) {
      return
    }

    this.setState({
      active: false
    })
  }

  _onKeyDown (event) {
    switch (event.key) {
      case 'Escape':
        this.setState({
          active: false
        })
        break
    }
  }

  _optionRenderer ({ focusedOption, focusOption, key, labelKey, option, selectValue, style }) {
    const classNames = ['VirtualizedSelectOption']
    if (option === focusedOption) {
      classNames.push('VirtualizedSelectFocusedOption')
    }
    if (option.disabled) {
      classNames.push('VirtualizedSelectOptionHeader')
    }

    const text = option[labelKey]

    const events = option.disabled
      ? {}
      : {
        onClick: () => selectValue(option),
        onMouseOver: () => focusOption(option)
      }

    return (
      <div
        className={classNames.join(' ')}
        key={key}
        style={style}
        title={text}
        {...events}
      >
        <Row>
          {text}
        </Row>
      </div>
    )
  }
}
