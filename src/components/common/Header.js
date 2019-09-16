import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import logo from './logo.png'
import Search from './Search';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #0f273d;
  width: 100%;
  height: 80px;
`

const StyledHeaderLogo = styled.img`
  position: absolute;
  top: 30px;
  left: 20px;
  width: 90px;

  @media (max-width: 700px) {
    display: none;
  }
`

const Header = () => {
  return <StyledHeader>
    <Link to="/">
      <StyledHeaderLogo src={logo} alt="logo"></StyledHeaderLogo>
    </Link>
    <Search/>
  </StyledHeader>
}

export default Header