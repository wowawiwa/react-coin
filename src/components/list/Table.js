import React from 'react'
import { withRouter } from 'react-router-dom'
import './Table.css'
import { renderChangePercent } from '../../helpersView';

const Table = ({currencies, history}) => {
  return <div className="Table-container">
    <table className="Table">
      <thead className="Table-head">
        <tr>
          <th>Crypto</th>
          <th>Price</th>
          <th>Market cap</th>
          <th>24H change</th>
        </tr>
      </thead>
      <tbody className="Table-body">
        {currencies.map((cur) => (
          <tr key={cur.id} onClick={() => history.push(`/currency/${cur.id}`)}>
            <td>
              <span className="Table-rank">{cur.rank}</span>
              {cur.name}
            </td>
            <td>
              <span className="Table-dollar">$ </span>
              {cur.price}
            </td>
            <td>
              <span className="Table-dollar">$ </span>
              {cur.marketCap}
            </td>
            <td>
              {renderChangePercent(cur.percentChange24h)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
}

export default withRouter(Table)