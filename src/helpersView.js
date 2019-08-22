import React from 'react'

export const renderChangePercent = (percent) => {
  if (percent > 0) {
    return <span className="percent-raised">{percent}% &uarr;</span>
  } 
  if (percent < 0) {
    return <span className="percent-fallen">{percent}% &darr;</span>
  }
  return <span>{percent}%</span>
}
