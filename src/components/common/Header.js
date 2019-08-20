import React from 'react'

import './Header.css'
import logo from './logo.png'

const Header = () => {
  return <div className="Header">
    <img src={logo} alt="logo" className="Header-logo"></img>
  </div>
}

export default Header