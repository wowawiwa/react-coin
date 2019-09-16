import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledPagination = styled.div`
  margin: 50px auto;
  text-align: center;
`
const StyledPaginationButton = styled.button`
  text-align: center;
  border: none;
  border-radius: 16px;
  background-color: #4997e5;
  transition: background-color .2s;
  color: white;
  cursor: pointer;
  margin: 10px;
  width: 44px;
  height: 34px;

  :hover {
    background-color: #457cb2;
  }

  :focus {
    outline: none;
  }

  :disabled {
    background-color: #1f364d;
    cursor: not-allowed;
  }
`

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

export default Pagination