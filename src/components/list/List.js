import React from 'react'

import { handleResponse } from '../../helpers'
import { API_URL } from '../../config'
import './Table.css'
import Loading from '../common/Loading'

class List extends React.Component {
  constructor() {
    super()

    this.state = {
      loading: false,
      currencies: [],
      error: null,
    }
  }
  
  componentDidMount() {
    this.setState({loading: true})

    // TODO: Move URL to config
    fetch(`${API_URL}/cryptocurrencies?page=1&perPage=20`)
      .then(handleResponse)
      .then(data => {
        this.setState({currencies: data.currencies, loading: false})
      })
      .catch(err => {
        console.log("ERRRRooooo");
        // if the networking fails, this will fail because err.errorMessage is undefined?
        this.setState({error: err.errorMessage, loading: false})
        console.log("ERRRRooooo rrrrrrr");
      })
  }
  
  render() {
    if (this.state.loading) {
      return <div className="loading-container"><Loading/></div>
    } 

    if (this.state.error) {
      return <div className="error">{this.state.error}</div>
    }

    if (this.state.currencies) {
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
            {this.state.currencies.map((cur) => (
              <tr key={cur.id}>
                <td>
                  <span className="Table-rank">{cur.rank}</span>
                  {cur.name}
                </td>
                <td>
                  <span className="Table-dollar">$ {cur.price}</span>
                </td>
                <td>
                  <span className="Table-dollar">$ {cur.marketCap}</span>
                </td>
                <td>
                  {this.renderChangePercent(cur.percentChange24h)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    }

    return <div>No currencies loaded</div>
  }

  renderChangePercent(percent) {
    if (percent > 0) {
      return <span className="percent-raised">{percent}% &uarr;</span>
    } 
    if (percent < 0) {
      return <span className="percent-fallen">{percent}% &darr;</span>
    }
    return <span>{percent}%</span>
  }
}

export default List