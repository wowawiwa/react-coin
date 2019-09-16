import React from 'react'
import styled from 'styled-components'

import { handleResponse } from '../../helpers'
import { renderChangePercent } from '../../helpersView'
import Loading from '../common/Loading'
import { API_URL } from '../../config'

const StyledDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 40px;
  padding: 0 60px;
`

const DetailHeading = styled.h1`
  font-size: 24px;
  font-weight: 300;
`

const DetailContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin-top: 30px;
  padding: 40px 40px 0;
  border-radius: 4px;
  box-shadow: 0px 0px 40px 0px#1f364d;
`

const DetailItem = styled.div`
  margin-bottom: 50px;
`

const DetailValue = styled.span`
  border-radius: 20px;
  background-color: #1f364d;
  font-size: 14px;
  padding: 8px 12px;
  margin-left: 10px;
`

const DetailTitle = styled.span`
  display: block;
  color: #9cb3c9;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 10px;
`

const DetailDollar = styled.span`
  color: #9cb3c9;
  margin-right: 6px;
`

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
      return <LoadingContainer><Loading/></LoadingContainer>
    }

    if (this.state.error !== null) {
      return <div className="error">Error: {this.state.error}</div>
    }

    if (!this.state.currency) {
      return <div>No currencies loaded.</div>
    }

    return <Detail>
      <DetailHeading>
        {this.state.currency.name} ({this.state.currency.symbol})
      </DetailHeading>

      <DetailContainer>
        <DetailItem>
          Price <DetailValue>$ {this.state.currency.price}</DetailValue>
        </DetailItem>
        <DetailItem>
          Rank <DetailValue>{this.state.currency.rank}</DetailValue>
        </DetailItem>
        <DetailItem>
          24H Change
          <DetailValue>{renderChangePercent(this.state.currency.percentChange24h)}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailTitle>Market cap</DetailTitle>
          <DetailDollar>$</DetailDollar>
          {this.state.currency.marketCap}
        </DetailItem>
        <DetailItem>
          <DetailTitle>24H Volume</DetailTitle>
          <DetailDollar>$</DetailDollar>
          {this.state.currency.volume24h}
        </DetailItem>
        <DetailItem>
          <DetailTitle>Total supply</DetailTitle>
          {this.state.currency.totalSupply}
        </DetailItem>
      </DetailContainer>
    </Detail>
  }

  // private

  componentDidMount() {
    this.fetchDetails(this.props.currency)
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.currency === this.props.currency) {
      return
    }
    this.fetchDetails(nextProps.currency);
  }

  fetchDetails(currency) {
    this.setState({loading: true})

    fetch(`${API_URL}/cryptocurrencies/${currency}`)
    .then(handleResponse)
    .then(data => {
      this.setState({currency: data, error: null, loading: false})
    })
    .catch(err => {
      console.log("Error");
      this.setState({error: err.errorMessage, loading: false})
    })
  }
}

export default Detail