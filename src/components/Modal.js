import React, { Component } from 'react';
import '../styles/modal.css';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: null
    };
    this.inputShares = React.createRef()
    this.calculateTotal = this.calculateTotal.bind(this);
    this.purchaseStocks = this.purchaseStocks.bind(this);
  }
  calculateTotal() {
    const shares = this.inputShares.current.value;
    if (shares) {
      this.setState({
        total: parseInt(shares, 10) * this.props.company.latestPrice
      })
    } else {
      this.setState({
        total: null
      })
    }
  }

  purchaseStocks(e) {
    e.preventDefault()

    const symbol = this.props.company.symbol;
    const latestPrice = this.props.company.latestPrice;
    const quantity = this.inputShares.current.value;
    const total = parseInt(quantity, 10) * this.props.company.latestPrice
    const user_id = localStorage.getItem('userId')
    const purchaseStocksData = {
      symbol,
      price: latestPrice,
      quantity,
      total,
      user_id
    }
 }

  render() {
    const { type } = this.props;
    if (this.props.company) {
      const { companyName, latestPrice, symbol } = this.props.company;
      return (
        <div className={`modal ${this.props.active ? "is-active" : ""}`}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{companyName}</p>
              <button className="delete" aria-label="close" onClick={this.props.onClose}></button>
            </header>
            <section className="modal-card-body">
              <p><b>Ticker Symbol :</b> { symbol }</p> 
              <p><b>Latest Price :</b> { latestPrice } USD</p>
              <p><b>Amount of Shares:</b> 
                <input 
                  className="input" 
                  type="interger" 
                  onChange={this.calculateTotal}
                  placeholder="eg. 100"
                  ref={this.inputShares}
                />
              </p>
              { this.state.total && <p><b>Total:</b> { this.state.total } USD</p> }
            </section>
            <footer className="modal-card-foot">
              <button
                className={`button ${type === 'buy' ? 'is-success' : 'is-danger'} is-rounded`}
                onClick={(e) => {
                  e.preventDefault();
                  return this.props.onSubmit(symbol, this.inputShares.current.value);
                }}
              >
                { type === 'buy' ? 'Buy' : 'Sell' }
              </button>
              <button className="button is-rounded" onClick={this.props.onClose}>Cancel</button>
            </footer>
          </div>
        </div>
      )
    } else {
      return <div></div>;
    }
  }
}

export default Modal;

