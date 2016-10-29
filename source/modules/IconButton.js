import styled from 'styled-components'

export default styled.button`
  width: 2.5rem;
  height: 2.5rem;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
  padding: 0;
  background-color: rgba(249, 38, 114, 0.75);
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
  transition: 250ms all ease;

  &:hover {
    background-color: rgb(249, 38, 114);
  }

  &:disabled {
    background-color: rgba(249, 38, 114, 0.25);
  }
`
