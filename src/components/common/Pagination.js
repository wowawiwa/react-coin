import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Pagination = ({current, total, onPageChange}) => {
  let elements = []

  if (!total || !current || total < 2 || current > total) {
    return null // TODO: may not be the best solution
  }
  
  if (current > 1) {
    elements.push(<StyledPaginationButton onClick={(event) => onPageChange(1)}>1</StyledPaginationButton>)
    elements.push(<StyledPaginationButton onClick={(event) => onPageChange(current - 1)}>&larr;</StyledPaginationButton>)
  }

  elements.push(<StyledPaginationButton disabled>{current}</StyledPaginationButton>)

  if (current < total) {
    elements.push(<StyledPaginationButton onClick={(event) => onPageChange(current + 1)}>&rarr;</StyledPaginationButton>)
    elements.push(<StyledPaginationButton onClick={(event) => onPageChange(total)}>{total}</StyledPaginationButton>)
  }

  return <StyledPagination>{elements}</StyledPagination>
}

Pagination.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
}

const StyledPagination = styled.div`
  margin: 50px auto;
  text-align: center;
`
const StyledPaginationButton = styled.button`
  width: 44px;
  height: 34px;

  text-align: center;
  border: none;
  border-radius: 16px;
  background-color: ${({theme}) => theme.contrastedEl};
  transition: background-color .2s;
  color: white;
  cursor: pointer;
  margin: 10px;

  :hover {
    background-color: ${({theme}) => theme.contrastedHoverEl};
  }

  :focus {
    outline: none;
  }

  :disabled {
    background-color: ${({theme}) => theme.mainHighlightedBg};
    cursor: not-allowed;
  }
`

export default Pagination