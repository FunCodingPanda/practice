import React, { Component } from 'react';
import axios from 'axios';
import '../styles/AccountHistory';

class AccountHistory extends Component {
  render () {
    return (
      <div> 
        <h1 id='AccountHistoryHeader'>Account History</h1> 
        <h4> Porfolio Peformance - Original Investment: {}, Current Holdings: {} </h4>
      </div>
    )
  }
}

export default AccountHistory;
