import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import logo from './logo.png'

const Header = () => {
  return <div className="Header">
    <Link to="/">
      <img src={logo} alt="logo" className="Header-logo"></img>
    </Link>
  </div>
}

export default Header