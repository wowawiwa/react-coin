import styled from 'styled-components'

const Error = styled.div`
  width: 100%;
  margin: 40px 0;

  text-align: center;
  color: ${props => props.theme.errTxt};
`

export default Error