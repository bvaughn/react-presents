export default (props) => props.theme.isPresenterMode && `
  outline: 0.25rem solid #37F;
  outline-offset: -0.25rem;

  &::before {
    content: 'presenter';
    position: fixed;
    top: 0;
    left: 0;
    background-color: #36F;
    padding: 0.25rem;
    color: #fff;
    font-size: 0.65rem;
  }
`
