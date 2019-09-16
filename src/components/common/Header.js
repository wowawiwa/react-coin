import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import logo from './logo.png'
import Search from './Search';

const Header = () => {
  return <StyledHeader>
    <Link to="/">
      <StyledHeaderLogo src={logo} alt="logo"></StyledHeaderLogo>
    </Link>
    <Search/>
  </StyledHeader>
}

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 80px;

  justify-content: center;
  background-color: ${({theme}) => theme.mainBg};
`

const StyledHeaderLogo = styled.img`
  position: absolute;
  top: 30px;
  left: 20px;
  width: 90px;

  ${({theme}) => theme.small`
    display: none;
  `}
`
export default Header