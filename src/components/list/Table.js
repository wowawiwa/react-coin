import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { renderChangePercent } from '../../helpersView';

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

const TableContainer = styled.div`
  overflow-x: auto; /* Needed for table to be responsive */
`

const StyledTable = styled.table`
  width: 100%;

  border-collapse: collapse;
  border-spacing: 0;
`

const TableHead = styled.thead`
  background-color: ${({theme}) => theme.mainContrastedBg};

  tr th {
    padding: 10px 20px;
    color: ${({theme}) => theme.secTxt};
    text-align: left;
    font-size: 14px;
    font-weight: 400;
  }
` 

const TableBody = styled.tbody`
  text-align: left;
  background-color: ${({theme}) => theme.mainBg};

  tr td {
    padding: 24px 20px;
    border-bottom: 2px solid ${({theme}) => theme.mainContrastedBg};
    color: ${({theme}) => theme.priTxt};
    cursor: pointer;
  }

  tr {
    :hover {
      background-color: ${({theme}) => theme.mainHighlightedBg};
    }
  }
`

const TableRank = styled.span`
  margin-right: 18px;
  color: ${({theme}) => theme.secTxt};
  font-size: 12px;
`

const TableDollar = styled.span`
  margin-right: 6px;
  color: ${({theme}) => theme.secTxt};
`

export default withRouter(Table)