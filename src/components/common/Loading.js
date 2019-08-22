import React from 'react'
import './Loading.css'

const Loading = (props) => {
  const size = props.size || '28px'
  return <div className="Loading" style={{width: size, height: size}}/>
}

export default Loading