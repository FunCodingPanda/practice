import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from './Modal'
import Holdings from './Holdings';
import '../styles/Account.css'
import { getCurrentUser } from '../utils/users';
import StockChart from './StockChart';


class Account extends Component {
  constructor(props){
    super(props);
    this.state = {
      company: null,
      dividend: 0,
      user: { cash: 0 },
      error: null,
      buyModalActive: false,
      sellModalActive: false,
      holdings: [],
      stocks: {},
      stockChartData: []
    };
    this.inputCompany = React.createRef()
    this.search = this.search.bind(this);
    this.openBuyModal = this.openBuyModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openSellModal = this.openSellModal.bind(this);
    this.buy = this.buy.bind(this);
    this.sell = this.sell.bind(this);
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
      return axios.get(`${process.env.REACT_APP_BASE_URL}/users/${user.id}/holdings`)
    }).then(response => response.data)
      .then(holdings => {
      this.setState({ holdings });
      const symbols = holdings.map(holding => holding.ticker_symbol).join(',');
      // get stock prices
      return axios.get(`${process.env.REACT_APP_IEX_URL}/stock/market/batch?symbols=${symbols}&types=quote`)
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
      // get stock information
      axios.get(`${process.env.REACT_APP_IEX_URL}/stock/${symbol}/quote`)
        .then(response => {
          this.setState({
            company: response.data
          })
        });
      // get stock ratios 
      axios.get(`${process.env.REACT_APP_IEX_URL}/stock/${symbol}/stats`)
        .then(response => { 
          this.setState({
            ratios: response.data
          })
        });
      //get stocks ratios 2
      axios.get(`${process.env.REACT_APP_IEX_URL}/stock/${symbol}/financials`)
        .then(response => { 
          this.setState({
            ratios2: response.data.financials
          })
        });
      //get dividends
      axios.get(`${process.env.REACT_APP_IEX_URL}/stock/${symbol}/dividends/6m`)
        .then(response => {
          this.setState({
            dividend: (response.data.length > 0 ? response.data[0].amount : 0)
          });
        });
      axios.get(`${process.env.REACT_APP_IEX_URL}/stock/${symbol}/chart/1y`)
        .then(response => {
          const stockChartData = response.data.map(day =>
            [(new Date(day.date)).getTime(), day.close]
          );
          this.setState({ stockChartData });
        });
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
    axios.post(`${process.env.REACT_APP_BASE_URL}/stocks/${symbol}/buy`, data)
      .then(response => response.data)
      .then(() => this.setState({
        buyModalActive: false
      }))
      .then(() => this.refreshState());
  }

  sell(symbol, quantity) {
    const dataSell = {
      userId: this.state.user.id,
      quantity, 
      price: this.state.company.latestPrice
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}/stocks/${symbol}/sell`, dataSell)
     .then(response => response.data)
     .then(() => this.setState({
       sellModalActive: false
     }))
     .then(() => this.refreshState());
  }

  render () {
    return (
      <form>
        <h1 id="accountHeader"> My Account </h1>
        <h4><b>Available Cash:</b> {`${this.state.user.cash.toFixed(2)}`} USD </h4>
        <div className="accountHistoryButton"> 
          <Link to="/AccountHistory">
            <button className="button is-rounded is-info accountHistoryButton">
                Account History
            </button>
          </Link>
        </div>
        <div className="columns">
          <div className="column is-two-fifths">
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
                  {
                    this.state.stockChartData.length > 0 &&
                      <StockChart
                        title={`${this.state.company.symbol} Price`}
                        data={this.state.stockChartData}
                      />
                  }
                  <p><b>Company:</b> { this.state.company.companyName }</p>
                  <p><b>Symbol:</b> { this.state.company.symbol }</p>
                  <p><b>Latest Price:</b> { this.state.company.latestPrice } USD</p>
                  <p><b>Dividend:</b> {
                    this.state.dividend !== 0 ? `${this.state.dividend} USD` : "No Dividend"
                  }</p>
                  <p><b>Change from Previous Close:</b> { this.state.company.change } USD ({ (100 * this.state.company.changePercent).toFixed(2) }%)</p>
                  <p><b>Return on Equity (ROE):</b> { this.state.ratios && this.state.ratios.returnOnEquity } %</p>
                  <p><b>Return on Assets (ROA):</b> { this.state.ratios && this.state.ratios.returnOnAssets } %</p>
                  <p><b>Net Profit Margin:</b> { this.state.ratios && (100 * (this.state.ratios.grossProfit/this.state.ratios.revenue)).toFixed(2) } %</p> 
                  <p><b>Earnings Before Interest and Tax (EBIT):</b>{ this.state.ratios2 && this.state.ratios2[0].operatingRevenue - this.state.ratios2[0].operatingExpense }</p> 
                  <p><b>EBITDA:</b> { this.state.ratios && this.state.ratios.EBITDA } </p>
                  <p><b>Current Ratio:</b> { 
                    this.state.ratios2 &&
                      (
                        (!this.state.totalLiabilities || !this.state.currentAssets) ?
                        "Information is not available" :
                        this.state.ratios2[0].currentAssets / this.state.ratios2[0].totalLiabilities
                      ) }</p>
                  <p><b>Debt to Equity Ratio:</b> {
                    this.state.ratios2 && 
                    (!this.state.totalLiabilities || !this.state.shareholdersEquity ?
                    "Information is not available" :
                    this.state.ratios2[0].totalLiabilities/this.state.ratios2[0].shareholderEquity) }</p>
                </div>
            }
          </div>
          <div className="column">
            <h5><b>My Shares</b></h5>
            <Holdings holdings={this.state.holdings} stocks={this.state.stocks} />
          </div>
        </div>
        <div> {/*id='ratios'*/}

            <section className="hero is-success is-medium">
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">
                    Information on Financial Analysis Ratios
                  </h1>
                  <h2 className="subtitle">
                    <b>Profitability Ratios</b>
                        <p>Return on Equity (ROE, Return on net worth):</p>
                          <span className='ratioInfo'> 
                            Measure of profitability that calculates how many dollars of profit a company generates with each dollar of shareholders’ equity 
                          </span>

                        <p>{'\n'}Return on Assets (ROA):</p>
                          <span className='ratioInfo'> 
                            It is an indicator of how profitable a company is relative to its total assets. This gives an idea as to how efficient management is at using its assets to generate earnings.   
                          </span>
                        
                    
                  </h2>
                  <h2 className="subtitle">
                    <b>Operating Management Ratios </b>
                      <p>Gross Profit Margin:</p>
                        <span className='ratioInfo'> 
                            Financial metric that assess a company’s health and business model revealing the proportion of money left over after accounting for the cost of goods sold.
                        </span>
                      <p>{'\n'}Earnings Before Interest and Tax:</p>
                        <span className='ratioInfo'> 
                          Financial metric that assess a company’s health and business model revealing the proportion of money left over after accounting for the cost of goods sold.
                        </span>
                      <p>{'\n'}Earnings Before Interest, Tax, Depreciation and Amortization:</p>
                      <span className='ratioInfo'> 
                          Includes all of a firm profits and expenses except interest, tax, depreciation, and amortization.
                      </span>
                      <p>{'\n'}Net Profit Margin:</p>
                      <span className='ratioInfo'> 
                        Includes all of a firm profits and expenses except interest, tax, depreciation, and amortization.
                      </span>
                  </h2>
                  <h2 className="subtitle">
                    <b>Leverage and Liquidity Ratios </b>
                      <p>Current Ratio:</p> 
                      <span className='ratioInfo'> 
                        Measures the assets a company plans to use over the next 12 months with the debts it must pay during that same period. 
                        This ratio lets you know whether the company will be able to pay any bills due over the next 12 months with assets it has on hand.
                        It is Current Assets over Current Liabilities.
                      </span>
                      <p>{'\n'}Debt-to-Equity:</p>
                      <span className='ratioInfo'> 
                        The debt-to-equity ratio is a measure of the relationship between the capital contributed by creditors and the capital contributed by shareholders. 
                        Total Liabilities over Shareholders' Equity.
                      </span>
                  </h2>
                </div>
              </div>
            </section>

        </div> 
      </form>
    )
  }
}

export default Account;

