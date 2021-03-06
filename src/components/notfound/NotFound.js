import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const StyledNotFound = styled.div`
  width: 100%;
  
  text-align: center;
  margin-top: 60px;
`

const NotFoundTitle = styled.h1`
  font-weight: 400;
  color: ${({theme}) => theme.secTxt};
`

const NotFoundLink = styled(Link)`
  display: inline-block;

  padding: 18px;
  margin-top: 40px;
  color: ${({theme}) => theme.priTxt};
  text-decoration: none;
  border: 1px solid ${({theme}) => theme.secTxt};
  border-radius: 4px;
  transition: border .2s;

  :hover {
    border: 1px solid ${({theme}) => theme.priTxt};
  }
`

const NotFound = () => {
  return (
    <StyledNotFound>
      <NotFoundTitle>Oops! Page not found</NotFoundTitle>

      <NotFoundLink to="/">Go to homepage</NotFoundLink>
    </StyledNotFound>
  );
}

export default NotFound;