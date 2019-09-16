import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { API_URL } from '../../config';
import { handleResponse } from '../../helpers';
import { Loading } from './Loading';

class Search extends React.Component {
  constructor() {
    super()

    this.state = {
      loading: false,
      query: '',
      error: null,
      results: [],
    }
    
    this.handleChange = this.handleChange.bind(this)
  }

  render() {
    // TODO: Size in px is a bad interface.
    return <StyledSearch>
      <SearchIcon/>
      
      <SearchInput 
        type="text"
        placeholder="Currency name"
        onChange={this.handleChange}
        value={this.state.query}
      />
      
      {
        this.state.loading && <SearchLoading>
          <Loading size="12px"/>
        </SearchLoading>
      }

      {this.renderSearchResults()}
    </StyledSearch>
  }

  renderSearchResults() {
    const {query, loading, results} = this.state

    if (query === '' || loading) {
      return null
    }
    
    if (results.length <= 0) {
      return (
        <SearchResultContainer>
          <SearchNoResult>
            No results found.
          </SearchNoResult>
        </SearchResultContainer>
      );
    } else {
      return (
        <SearchResultContainer>
          {this.state.results.map(res => (
            <SearchResult
              key={res.id}
              onClick={() => this.handleClick(res.id)}
            >
              {res.name} ({res.symbol})
            </SearchResult>
          ))}
        </SearchResultContainer>
      );
    }
  }

  handleClick(currencyId) {
    this.setState({results: [], query: ''})
    this.props.history.push(`/currency/${currencyId}`)
  }

  handleChange(event) {
    this.setState({query: event.target.value, loading: true}) // TODO: debounce

    if (this.state.query === '') {
      return
    }

    fetch(`${API_URL}/autocomplete?searchQuery=${this.state.query}`)
    .then(handleResponse)
    .then(data => {
      console.log(data);
      this.setState({results: data, error: null, loading: false})
    })
    .catch(err => {
      console.log("Autocomplete API error");
      this.setState({error: true, loading: false})
    })
  }
}

const StyledSearch = styled.div`
  position: relative;
  width: 30%;
  height: 35px;

  @media (max-width: 700px) {
    width: 100%;
  }

  margin: 0 auto;
  padding: 0 20px;
`
const SearchIcon = styled.span`
  z-index: 1;
  position: absolute;
  top: 9px;
  left: 28px;
  width: 18px;
  height: 18px;

  background-image: url('./search.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`

const SearchInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  
  background-color: #1f364d;
  border-radius: 4px;
  border: 0;
  padding-left: 35px;
  color: white;
  opacity: .8;
  transition: opacity .2s;

  :focus {
    outline: none;
    opacity: 1;
  }

  ::placeholder {
    color: #9cb3c9;
    opacity: 1;
  }
`

const SearchLoading = styled.div`
  position: absolute;
  top: 9px;
  right: 28px;
`

const SearchResultContainer = styled.div`
  position: relative;
  width: 100%;
  max-height: 299px;
  overflow-y: auto;
  
  margin-top: 10px;

  background-color: #0f273d;
  border: 1px solid #0c2033;
  border-radius: 4px;
  box-shadow: 0px 0px 40px 0px#1f364d;
`

const SearchResult = styled.div`
  padding: 15px 0 15px 35px;
  
  color: #9cb3c9;
  border-bottom: 2px solid #0c2033;
  cursor: pointer;
  :hover {
    color: #fff;
  }
`

const SearchNoResult = styled.div`
  padding: 15px 0 15px 35px;
  color: #9cb3c9;
  border-bottom: 1px solid #0f273d;
`

export default withRouter(Search)