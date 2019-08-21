import React from 'react'
import './Table.css'

const renderChangePercent = (percent) => {
  if (percent > 0) {
    return <span className="percent-raised">{percent}% &uarr;</span>
  } 
  if (percent < 0) {
    return <span className="percent-fallen">{percent}% &darr;</span>
  }
  return <span>{percent}%</span>
}

const Table = (props) => {
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
        {props.currencies.map((cur) => (
          <tr key={cur.id}>
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

export default Table