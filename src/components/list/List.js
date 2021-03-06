import React from 'react'

import { handleResponse } from '../../helpers'
import { API_URL } from '../../config'
import Table from './Table'
import Pagination from '../common/Pagination'
import { Loading, LoadingContainer } from '../common/Loading'
import Error from '../common/Error'

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

    this.onPageChange = this.onPageChange.bind(this)
  }

  componentDidMount() {
    this.fetchCurrencies()
  }
  
  render() {
    if (this.state.loading) {
      return <LoadingContainer><Loading/></LoadingContainer>
    } 

    if (this.state.error) {
      return <Error>{this.state.error}</Error>
    }

    if (this.state.currencies.length <= 1) {
      return <div>No currencies loaded</div>
    }

    return <div>
      <Table currencies={this.state.currencies}/>
      <Pagination current={this.state.page} total={this.state.pageTotal} onPageChange={this.onPageChange}/>
    </div>
  }

  onPageChange(pageNum) {
    console.log(pageNum);
    
    this.setState({page: pageNum}, this.fetchCurrencies)
  }

  fetchCurrencies() {
    this.setState({loading: true})

    fetch(`${API_URL}/cryptocurrencies?page=${this.state.page}&perPage=20`)
    .then(handleResponse)
    .then(data => {
      this.setState({currencies: data.currencies, pageTotal: data.totalPages, loading: false})
    })
    .catch(err => {
      // TODO: if the networking fails, this will fail because err.errorMessage is undefined.
      this.setState({error: err.errorMessage, loading: false})
    })
  }
}

export default List