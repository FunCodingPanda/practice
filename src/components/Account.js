import React, { Component } from 'react';
import axios from 'axios';
import Link from 'react-router-dom';
import '../styles/Account.css'


class Account extends Component {
  constructor(props){
    super(props);
    


  }
  render () {
    let holdings = 20000 
    return (
      <div>
        <h1 id="accountHeader"> My Account </h1>
        <h4><b>Available Cash:</b> {`${holdings}`} USD </h4>
        <div className="accountHistoryButton"> 
          <button className="button is-rounded is-info accountHistoryButton">
              Account History
          </button>
        </div>
        <div className="field has-addons account-searchbox">
          <div className="control">
            <input className="input" type="text" placeholder="Ticker Symbol" />
          </div>
          <div>
            <button className="button is-success is-rounded accountButtons">
              Buy
            </button>
            <button className="button is-danger is-rounded accountButtons">
              Sell
            </button>
          </div>
        </div>
        <div className="container">
          <h5><b>My Shares:</b></h5>
        </div>  
      </div>
    )
  }
}

export default Account;

