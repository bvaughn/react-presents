import styled from 'styled-components'

export default styled.div`
  height: 100%;
  padding: 1rem;

  outline: ${(props) => props.theme.isPresenterMode ? '0.25rem solid #37F' : 'none'};
  outline-offset: -0.25rem;

  @media (max-width: 600px) {
    padding: 0.5rem;
  }

  h1 {
    paddingRight: 9rem;
  }
`
