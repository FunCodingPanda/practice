import React, { Component } from 'react';
import axios from 'axios';
import '../styles/AccountHistory.css';

class AccountHistory extends Component {
  render () {
    return (
      <div> 
        <div>
          <h1 id='AccountHistoryHeader'>Account History</h1> 
          <h4> <b>Porfolio Peformance -</b> Original Investment: Current Holdings: </h4>
        </div>
        <div id="percentageDiff">
          <p><b> + 6.99 % </b></p>
        </div>
      </div>
    )
  }
}

export default AccountHistory;
