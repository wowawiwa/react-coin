import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { renderChangePercent } from '../../helpersView';

const TableContainer = styled.div`
  overflow-x: auto; /* Needed for table to be responsive */
`

const StyledTable = styled.table`
  width: 100%;

  border-collapse: collapse;
  border-spacing: 0;
`

const TableHead = styled.thead`
  background-color: #0c2033;

  tr th {
    padding: 10px 20px;
    color: #9cb3c9;
    text-align: left;
    font-size: 14px;
    font-weight: 400;
  }
` 

const TableBody = styled.tbody`
  text-align: left;
  background-color: #0f273d;

  tr td {
    padding: 24px 20px;
    border-bottom: 2px solid #0c2033;
    color: #fff;
    cursor: pointer;
  }
`

const TableRank = styled.span`
  margin-right: 18px;
  color: #9cb3c9;
  font-size: 12px;
`

const TableDollar = styled.span`
  margin-right: 6px;
  color: #9cb3c9;
`

const Table = ({currencies, history}) => {
  return <TableContainer>
    <StyledTable>
      <TableHead>
        <tr>
          <th>Crypto</th>
          <th>Price</th>
          <th>Market cap</th>
          <th>24H change</th>
        </tr>
      </TableHead>
      <TableBody>
        {currencies.map((cur) => (
          <tr key={cur.id} onClick={() => history.push(`/currency/${cur.id}`)}>
            <td>
              <TableRank>{cur.rank}</TableRank>
              {cur.name}
            </td>
            <td>
              <TableDollar>$ </TableDollar>
              {cur.price}
            </td>
            <td>
              <TableDollar>$ </TableDollar>
              {cur.marketCap}
            </td>
            <td>
              {renderChangePercent(cur.percentChange24h)}
            </td>
          </tr>
        ))}
      </TableBody>
    </StyledTable>
  </TableContainer>
}

export default withRouter(Table)