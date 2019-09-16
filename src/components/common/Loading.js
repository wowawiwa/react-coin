import React from 'react'
import styled from 'styled-components'

export const Loading = (props) => {
  const size = props.size || '28px'
  return <StyledLoader style={{width: size, height: size}}/>
}

export const LoadingContainer = styled.div`
  width: 100%;
  text-align: center;
  margin: 40px auto;
`

const StyledLoader = styled.div`
  width: 28px;
  height: 28px;
  display: inline-block;

  border: 2px solid ${props => props.theme.priTxt};
  border-right-color: transparent;
  border-radius: 50%;
  animation: rotate 1s infinite linear;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    
    100% {
      transform: rotate(360deg);
    }
  }
`