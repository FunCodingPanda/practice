import React, { Component } from 'react';
import axios from 'axios';
import '../styles/AccountHistory.css';
import Holdings from './Holdings';
import { getCurrentUser } from '../utils/users';

class AccountHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { cash: 0 },
      holdings: [],
      stocks: [],
      transactions: [],
      dataIsReady: false
    }
    this.refreshState = this.refreshState.bind(this);
  }

  componentDidMount() {
    this.refreshState();
  }

  refreshState() {
    // get current user
    getCurrentUser().then(user => {
      if (!user.error) {
        this.setState({
          user
        })
      }
      return user;
    }).then(user => {
      // get user holdings
      return axios.get(`http://localhost:3000/users/${user.id}/holdings`)
    }).then(response => response.data)
      .then(holdings => {
      this.setState({ holdings });
      const symbols = holdings.map(holding => holding.ticker_symbol).join(',');
      // get stock prices
      return axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=quote`)
    }).then(response => response.data)
      .then(stocks => this.setState({
        stocks,
        dataIsReady: true
      }))
      .then(() => axios.get(`http://localhost:3000/users/${this.state.user.id}/transactions`))
      .then(response => {
        console.log(response.data);
        return response.data;
      })
      .then(transactions => {
        console.log(transactions);
        return this.setState({ transactions });
      });
  }

  render () {
    if (this.state.dataIsReady) {

      const totalHoldings = this.state.holdings.reduce((sum, holding) => {
        const price = this.state.stocks[holding.ticker_symbol].quote.latestPrice;
        return sum + (holding.quantity * price);
      }, 0);
      const netWorth = this.state.user.cash + totalHoldings;
      const percentChange = 100 * (netWorth / 20000.0 - 1);
      return (
        <div> 
          <div>
            <h1 id='AccountHistoryHeader'>Account History</h1>
            <p style={{marginLeft: '140px'}}>
              Original Investment: <b>20000.00 USD</b><br />
              Current Cash: <b>{this.state.user.cash.toFixed(2)} USD</b><br />
              Total Holdings: <b>{totalHoldings.toFixed(2)} USD</b><br />
              Net Worth: <b>{netWorth.toFixed(2)} USD</b>
            </p>
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Symbol</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.transactions.map((transaction, idx) => {
                    return (
                      <tr>
                        <td>{transaction.type}</td>
                        <td>{transaction.ticker_symbol}</td>
                        <td>{transaction.quantity}</td>
                        <td>{transaction.price} USD</td>
                        <td>{transaction.total} USD</td>
                        <td>{transaction.created_at}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
          <div id="percentageDiff" className={percentChange > 0 ? 'is-green' : 'is-red'}>
            <p><b> {percentChange > 0 && '+'} {percentChange.toFixed(4)} % </b></p>
          </div>
        </div>
      )
    } else {
      return <div></div>;
    }
  }
}

export default AccountHistory;
