import React, { Component } from 'react';
import axios from 'axios';
import Link from 'react-router-dom';
import '../styles/Account.css'


class Account extends Component {
  render () {
    return (
      <div>
        <h1 id="accountHeader"> My Account </h1>
        <h4> Holdings: 20 000 USD </h4>
        <div className="field has-addons account-searchbox">
          <div className="control">
            <input className="input" type="text" placeholder="Search for a company" />
          </div>
          <div className="control">
            <a className="button">
              Buy
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Account;

