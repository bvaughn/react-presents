import styled from 'styled-components'
import presenterSlideStyle from './presenterSlideStyle'

export default styled.div`
  height: 100%;
  padding: 1rem;

  ${presenterSlideStyle}

  @media (max-width: 600px) {
    padding: 0.5rem;
  }

  h1 {
    paddingRight: 9rem;
  }
`
