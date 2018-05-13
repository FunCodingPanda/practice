import React, { Component } from 'react';
import axios from 'axios'; 
import '../styles/AllCompanies.css'; 


class AllCompanies extends Component {
  render () {
    return (
      <div>
        <h1 className="all-companies-title"> Search for a Company </h1>
        <div className="field has-addons companies-searchbox">
          <div className="control">
            <input className="input" type="text" placeholder="Search for a company" />
          </div>
          <div className="control">
            <a className="button">
              Search
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default AllCompanies;