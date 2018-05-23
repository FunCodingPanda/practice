import React, { Component } from 'react';
import '../styles/Holdings.css';

class Holdings extends Component {
  render () {
    return (
      <table className="holdings-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.holdings.map((holding, idx) => {
              let price = 0;
              if (this.props.stocks[holding.ticker_symbol]) {
                price = this.props.stocks[holding.ticker_symbol].quote.latestPrice;
              }
              return (
                <tr key={idx}>
                  <td>{holding.name}</td>
                  <td>{holding.ticker_symbol}</td>
                  <td>{holding.quantity}</td>
                  <td>{price.toFixed(2)} USD</td>
                  <td>{(holding.quantity * price).toFixed(2)} USD</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    )
  }
}

export default Holdings;
