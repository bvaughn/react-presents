import styled from 'styled-components'

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

  outline: ${(props) => props.theme.isPresenterMode ? '0.25rem solid #37F' : 'none'};
  outline-offset: -0.25rem;

  @media (max-width: 600px) {
    padding: 0.5rem;
  }
`
