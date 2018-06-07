import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    const userId = localStorage.getItem('userId');
    this.state = {
      userId
    }
  }

  componentDidMount() {
    if (this.state.userId) {
      axios.get(`${process.env.REACT_APP_BASE_URL}/users/${this.state.userId}`).then(response => {
        this.setState({
          user: response.data
        });
      });
    }
  } 
  
  logout() {
    localStorage.removeItem('auth');
    localStorage.removeItem('userId');
    window.location.assign('./');
  }

  render() {
    return (
      <nav className="navbar is-transparent">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img className="navbar-logo" src="./smartInvestinglogo.png" width="40" height="40" alt="Logo" />
          </a>
          <div className="navbar-burger burger" data-target="navbar-header">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navbar-header" className="navbar-menu">
          <div className="navbar-start">
            <h5 id='title'> SMART INVESTING </h5>
            <Link to="/" className="navbar-item">
              Home
            </Link>
            <Link to="/about" className="navbar-item">
              About
            </Link>
            {
              !this.state.user && <Link to="/signup"> <button className="navbar-item button is-rounded ebutton">
                Sign Up </button>
              </Link>
            }
            {
              !this.state.user && <Link to="/login">  <button className="navbar-item button is-rounded ebutton">
                Login </button>
              </Link>
            }
            {
              this.state.user && <a onClick={this.logout}> <button className="navbar-item button is-rounded ebutton">
                Log Out </button>
              </a>
            }
            {
             this.state.user && <Link to="/account" className="navbar-item">
              My Account
              </Link>
            }
          </div>
          <div className="navbar-end">
            <span className="navbar-item">
              { this.state.user && `Welcome, ${this.state.user.name}` }
            </span>
            <Link to="/AllCompanies">
              <button className="button is-rounded ebutton">Search Companies</button>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
