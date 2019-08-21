import React from 'react'

import { handleResponse } from '../../helpers'
import { API_URL } from '../../config'
import Table from './Table'
import Loading from '../common/Loading'

class List extends React.Component {
  constructor() {
    super()

    this.state = {
      loading: false,

      page: 1,
      pageTotal: null,
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
        // TODO: if the networking fails, this will fail because err.errorMessage is undefined?
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

    if (this.state.currencies.length > 1) {
      return <div>
        <Table currencies={this.state.currencies}/>
        {/* <Pagination current={this.state.page} total={this.state.pageTotal}/> */}
      </div>
    }

    return <div>No currencies loaded</div>
  }
}

export default List