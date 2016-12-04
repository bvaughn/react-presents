import styled from 'styled-components'
import presenterSlideStyle from './presenterSlideStyle'

export default styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  background-color: #222;
  color: #fff;
  padding: 1rem;

  ${presenterSlideStyle}

  @media (max-width: 600px) {
    padding: 0.5rem;
  }
`
