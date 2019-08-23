import React from 'react'
import PropTypes from 'prop-types'

import './Pagination.css'

const Pagination = ({current, total, onPageChange}) => {
  let elements = []

  if (!total || !current || total < 2 || current > total) {
    return null // TODO: may not be the best solution
  }
  
  if (current > 1) {
    elements.push(<button className="Pagination-button" onClick={(event) => onPageChange(1)}>1</button>)
    elements.push(<button className="Pagination-button" onClick={(event) => onPageChange(current - 1)}>&larr;</button>)
  }

  elements.push(<button className="Pagination-button" disabled>{current}</button>)

  if (current < total) {
    elements.push(<button className="Pagination-button" onClick={(event) => onPageChange(current + 1)}>&rarr;</button>)
    elements.push(<button className="Pagination-button" onClick={(event) => onPageChange(total)}>{total}</button>)
  }

  return <div className="Pagination">{elements}</div>
}

Pagination.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
}

export default Pagination