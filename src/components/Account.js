import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from './Modal'
import Holdings from './Holdings';
import '../styles/Account.css'
import { getCurrentUser } from '../utils/users';


class Account extends Component {
  constructor(props){
    super(props);
    this.state = {
      company: null,
      user: { cash: 0 },
      error: null,
      buyModalActive: false,
      sellModalActive: false,
      holdings: [],
      stocks: {}
    };
    this.inputCompany = React.createRef()
    this.search = this.search.bind(this);
    this.openBuyModal = this.openBuyModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openSellModal = this.openSellModal.bind(this);
    this.buy = this.buy.bind(this);
    this.sell = this.sell.bind(this);
  }

  componentDidMount() {
    getCurrentUser().then(user => {
      if (!user.error) {
        this.setState({
          user
        })
      }
      return user;
    }).then(user => {
      // return { data: [
      //   { symbol: 'AAPL', quantity: 4, price: 172.29 },
      //   { symbol: 'MSFT', quantity: 2, price: 98.33 },
      // ]};
      return axios.get(`http://localhost:3000/users/${user.id}/holdings`)
    }).then(response => response.data)
      .then(holdings => {
      this.setState({ holdings });
      const symbols = holdings.map(holding => holding.ticker_symbol).join(',');
      return axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=quote`)
    }).then(response => response.data)
      .then(stocks => this.setState({
        stocks
      }))
  }

  search(e) {
    e.preventDefault();

    const symbol = this.inputCompany.current.value;
    if (symbol) {
      this.setState({
        error: null
      })
      axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/quote`)
        .then(response => {
          this.setState({
            company: response.data
          })
        })
    } else {
      this.setState({
        company: null,
        error: null
      })
    }
  }

  openBuyModal(e) {
    e.preventDefault();

    const symbol = this.inputCompany.current.value;
    if (symbol) {
      this.setState({
        buyModalActive: true,
        sellModalActive: false
      })
    } else {
      this.setState({
        error: 'Please enter a stock symbol first!'
      })
    }
  }

  openSellModal(e) {
    e.preventDefault();


    const symbol = this.inputCompany.current.value;
    if (symbol) {
      this.setState ({
        buyModalActice: false,
        sellModalActive: true
      })
    } else {
      this.setState({
        error: 'Please enter a stock symbol first!'
      })
    }
  }

  closeModal(e) {
    e.preventDefault();

    this.setState({
      buyModalActive: false,
      sellModalActive: false
    })
  }

  buy(symbol, quantity) {
    const data = {
      userId: this.state.user.id,
      quantity,
      price: this.state.company.latestPrice
    }
    axios.post(`http://localhost:3000/stocks/${symbol}/buy`, data)
      .then(response => response.data)
      .then(({ cash, holding, transaction }) => this.setState({
        buyModalActive: false,
        user: {
          ...this.state.user,
          cash
        }
      }));
  }

  sell(symbol, quantity) {
    console.log(symbol, quantity)
  }

  render () {
    // users.cash in the holdings for updates
    // networth cash Fplus everything in the holdings
    return (
      <form>
        <h1 id="accountHeader"> My Account </h1>
        <h4><b>Available Cash:</b> {`${this.state.user.cash}`} USD </h4>
        <div className="accountHistoryButton"> 
          <Link to="/AccountHistory">
            <button className="button is-rounded is-info accountHistoryButton">
                Account History
            </button>
          </Link>
        </div>
        <div className="field has-addons account-searchbox">
          <div className="control">
            <input 
              className={`input ${this.state.error ? "is-danger" : ""}`}
              type="text" 
              placeholder="Ticker Symbol eg. AAPL"
              ref={this.inputCompany} 
              onInput={this.search}
            />
            { this.state.error && <p className="help is-danger">{ this.state.error }</p> }
          </div>
          <div>
            <Modal
              active={this.state.buyModalActive}
              onClose={this.closeModal}
              onSubmit={this.buy}
              company={this.state.company}
              type="buy"
            />
            <button className="button is-success is-rounded accountButtons" onClick={this.openBuyModal}>
              Buy
            </button>
          </div>
          <div>
            <Modal
              active={this.state.sellModalActive}
              onClose={this.closeModal}
              onSubmit={this.sell}
              company={this.state.company}
              type="sell"
            />
            <button className="button is-danger is-rounded accountButtons" onClick={this.openSellModal}>
              Sell
            </button>
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
        <div className="container">
          <h5><b>My Shares:</b></h5>
          <Holdings holdings={this.state.holdings} stocks={this.state.stocks} />
        </div>  
      </form>
    )
  }
}

export default Account;

