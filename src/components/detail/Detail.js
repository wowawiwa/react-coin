import React from 'react'
import styled from 'styled-components'

import { handleResponse } from '../../helpers'
import { renderChangePercent } from '../../helpersView'
import { Loading, LoadingContainer } from '../common/Loading'
import Error from '../common/Error'
import { API_URL } from '../../config'

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
      return <Error>Error: {this.state.error}</Error>
    }

    if (!this.state.currency) {
      return <div>No currencies loaded.</div>
    }

    return <StyledDetail>
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
    </StyledDetail>
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

const StyledDetail = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0 60px;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 40px;
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
  box-shadow: 0px 0px 40px 0px ${({theme}) => theme.mainHighlightedBg};
`

const DetailItem = styled.div`
  margin-bottom: 50px;
`

const DetailValue = styled.span`
  padding: 8px 12px;
  margin-left: 10px;

  border-radius: 20px;
  background-color: ${({theme}) => theme.mainHighlightedBg};
  font-size: 14px;
`

const DetailTitle = styled.span`
  display: block;
  
  margin-bottom: 10px;
  color: ${({theme}) => theme.secTxt};
  font-size: 12px;
  font-weight: bold;
`

const DetailDollar = styled.span`
  margin-right: 6px;
  color: ${({theme}) => theme.secTxt};
`

export default Detail