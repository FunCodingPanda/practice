import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
        total: parseInt(shares) * this.props.company.latestPrice
      })
    } else {
      this.setState({
        total: null
      })
    }
  }

  purchaseStocks(e) {
    e.preventDefault()
    
    const name = this.props.company.companyName;
    const symbol = this.props.company.symbol;
    const latestPrice = this.props.company.latestPrice;
    const shares = this.inputShares.current.value;
    const total = parseInt(shares) * this.props.company.latestPrice
    const user_id = localStorage.getItem('userId')
    const purchaseStocksData = {
      name,
      symbol,
      latestPrice,
      shares,
      total,
      user_id
    }
  }

  //   axios.post(http://localhost:3000/users, purchaseStocksData)
  //     .then(response => {
  //       if (response.status === 201) {

  //       renders the function 
  //       window.location.assign('./account');
  //     });
  // }

  render() {
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
              <button className="button is-success is-rounded" onClick={ this.purchaseStocks }>Buy</button>
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

