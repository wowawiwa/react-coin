import React from 'react'
import { withRouter } from 'react-router-dom'
import { API_URL } from '../../config';
import { handleResponse } from '../../helpers';
import Loading from './Loading';
import './Search.css'

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
    // TODO: remove size
    return <div className="Search">
      <span className="Search-icon"/>
      
      <input 
        className="Search-input"
        type="text"
        placeholder="Currency name"
        onChange={this.handleChange}
        value={this.state.query}
      />
      
      {
        this.state.loading && <div className="Search-loading">
          <Loading size="12px"/>
        </div>
      }

      {this.renderSearchResults()}
    </div>
  }

  renderSearchResults() {
    const {query, loading, results} = this.state

    if (query === '' || loading) {
      return null
    }
    
    if (results.length <= 0) {
      return (
        <div className="Search-result-container">
          <div className="Search-no-result">
            No results found.
          </div>
        </div>
      );
    } else {
      return (
        <div className="Search-result-container">
          {this.state.results.map(res => (
            <div
              key={res.id}
              className="Search-result"
              onClick={() => this.handleClick(res.id)}
            >
              {res.name} ({res.symbol})
            </div>
          ))}
        </div>
      );
    }
  }

  handleClick(currencyId) {
    this.setState({results: [], query: ''})
    this.props.history.push(`/currency/${currencyId}`)
  }

  handleChange(event) {
    this.setState({query: event.target.value, loading: true}) // TODO: introduce debounce

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

export default withRouter(Search)