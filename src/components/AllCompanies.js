import React, { Component } from 'react';
import axios from 'axios'; 
import '../styles/AllCompanies.css';
import { Typeahead } from 'react-typeahead';


class AllCompanies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: null,
      stockNames: []
    };
    this.inputCompany = React.createRef();

    this.search = this.search.bind(this);
  }
  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BASE_URL}/stocks`)
      .then(response => {
        this.setState({
          stockNames: response.data.map(stock => stock.name)
        });
      });
  }
  search(e) {
    e.preventDefault();

    const symbol = this.inputCompany.current.value;
    axios.get(`${process.env.REACT_APP_IEX_URL}/stock/${symbol}/quote`)
      .then(response => {
        this.setState({
          company: response.data
        })
      })
  }
  render () {
    return (
      <form onSubmit={this.search}>
        <h1 className="all-companies-title"> Search by Ticker Symbol </h1>
        <div className="field has-addons companies-searchbox">
          <div className="control">
            <input
              className="input is-rounded"
              placeholder="Ticker Symbol eg. AAPL"
              ref={this.inputCompany}
              type="text"
            />
          </div>
          <div className="control">
            <button type="submit" className="button is-link is-rounded">Search</button>
          </div>
        </div>
        {
          this.state.company &&
            <div id='searchedCompany'>
              <p><b>Company:</b> { this.state.company.companyName }</p>
              <p><b>Symbol:</b> { this.state.company.symbol }</p>
              <p><b>Latest Price:</b> { this.state.company.latestPrice } USD</p>
              <p><b>Change from Previous Close:</b> { this.state.company.change } USD ({ (100 * this.state.company.changePercent).toFixed(2) }%)</p>
            </div>
        }
      </form>
    )
  }
}

export default AllCompanies;


  // <Typeahead
        //   customClasses={{
        //     input: 'input'
        //   }}
        //   options={this.state.stockNames}
        // />