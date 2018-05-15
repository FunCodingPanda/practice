import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from './Modal'
import ModalSell from './sellModal'
import '../styles/Account.css'


class Account extends Component {
  constructor(props){
    super(props);
    this.state = {
      company: null,
      error: null,
      buyModalActive: false,
      sellModalActive: false
    };
    this.inputCompany = React.createRef()
    this.search = this.search.bind(this);
    this.openBuyModal = this.openBuyModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openSellModal = this.openSellModal.bind(this);
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

  render () {
    let holdings = 20000
    return (
      <form>
        <h1 id="accountHeader"> My Account </h1>
        <h4><b>Available Cash:</b> {`${holdings}`} USD </h4>
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
            <Modal active={this.state.buyModalActive} onClose={this.closeModal} company={this.state.company} />
            <button className="button is-success is-rounded accountButtons" onClick={this.openBuyModal}>
              Buy
            </button>
          </div>
          <div>
            <ModalSell active={this.state.sellModalActive} onClose={this.closeModal} company={this.state.company} />
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
        </div>  
      </form>
    )
  }
}

export default Account;

