import React from 'react'
import { handleResponse } from '../../helpers'
import { renderChangePercent } from '../../helpersView'
import Loading from '../common/Loading'
import { API_URL } from '../../config'
import './Detail.css'

class Detail extends React.Component {
  constructor() {
    super()

    this.state = {
      loading: false,

      currency: null,
      error: null,
    }
  }

  render() {
    if (this.state.loading) {
      return <div className="loading-container"><Loading/></div>
    }

    if (this.state.error !== null) {
      return <div className="error">Error: {this.state.error}</div>
    }

    if (!this.state.currency) {
      return <div>No currencies loaded.</div>
    }

    return <div className="Detail">
      <h1 className="Detail-heading">
        {this.state.currency.name} ({this.state.currency.symbol})
      </h1>

      <div className="Detail-container">
        <div className="Detail-item">
          Price <span className="Detail-value">$ {this.state.currency.price}</span>
        </div>
        <div className="Detail-item">
          Rank <span className="Detail-value">{this.state.currency.rank}</span>
        </div>
        <div className="Detail-item">
          24H Change
          <span className="Detail-value">{renderChangePercent(this.state.currency.percentChange24h)}</span>
        </div>
        <div className="Detail-item">
          <span className="Detail-title">Market cap</span>
          <span className="Detail-dollar">$</span>
          {this.state.currency.marketCap}
        </div>
        <div className="Detail-item">
          <span className="Detail-title">24H Volume</span>
          <span className="Detail-dollar">$</span>
          {this.state.currency.volume24h}
        </div>
        <div className="Detail-item">
          <span className="Detail-title">Total supply</span>
          {this.state.currency.totalSupply}
        </div>
      </div>
    </div>
  }

  // private

  componentDidMount() {
    this.fetchDetails()
  }

  fetchDetails() {
    this.setState({loading: true})

    fetch(`${API_URL}/cryptocurrencies/${this.props.currency}`)
    .then(handleResponse)
    .then(data => {
      this.setState({currency: data, error: null, loading: false})
    })
    .catch(err => {
      console.log("HELL");
      
      this.setState({error: err.errorMessage, loading: false})
    })
  }
}

export default Detail