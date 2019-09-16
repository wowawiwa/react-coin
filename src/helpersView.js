import React from 'react'
import styled from 'styled-components'

const PercentRaised = styled.span`
  color: ${({theme}) => theme.raisedTxt};
`

const PercentFallen = styled.span`
  color: ${({theme}) => theme.fallenTxt};
`

export const renderChangePercent = (percent) => {
  if (percent > 0) {
    return <PercentRaised>{percent}% &uarr;</PercentRaised>
  } 
  if (percent < 0) {
    return <PercentFallen>{percent}% &darr;</PercentFallen>
  }
  return <span>{percent}%</span>
}
