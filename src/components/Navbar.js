import React, { Component } from 'react';
import '../styles/Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar is-transparent">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="./l.png" width="50" height="80" />
          </a>
          <div className="navbar-burger burger" dataTarget="navbar-header">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navbar-header" className="navbar-menu">
          <div className="navbar-start">
            <h4 id='title'> SMART INVESTING </h4>
            <a className="navbar-item" href="/">
              Home
            </a>
            <a className="navbar-item" href="/">
              Sign Up
            </a>
            <a className="navbar-item" href="/">
              Login
            </a>
            <a className="navbar-item" href="/">
              Log Out
            </a>
            <a className="navbar-item" href="/">
              My Account
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
