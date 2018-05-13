import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Navbar.css';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null
    };
    this.inputEmail = React.createRef();
    this.inputPassword = React.createRef();

    this.loginButton = this.loginButton.bind(this);
  }

  loginButton(e){
    const email = this.inputEmail.current.value;
    const password = this.inputPassword.current.value;
    const data = {
      email, 
      password
    };

    this.setState({
      errors: null
    })

    axios.post('http://localhost:3000/login', data)
      .then(response => {
          console.log(response);
          if (response.status === 200 && response.data.auth) {
            localStorage.setItem('auth', JSON.stringify(response.data.auth));
            localStorage.setItem('userId', response.data.user.id);
          }
          window.location.assign('./account');
      }).catch(({ response }) => {
        if (response.data.errors) {
          this.setState({
            errors: response.data.errors
          })
        }
      })
    }

  render () {
    let passwordError = '', passwordClass = '';
    if (this.state.errors && this.state.errors.password) {
      passwordError = this.state.errors.password;
      passwordClass = 'is-danger';
    }
    return (
      <div className='authContainer'>
        <h1 className='navbarHeader'>Login</h1>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input ref={this.inputEmail} className="input" type="email" placeholder="Email" />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check"></i>
            </span>
          </p>
        </div>

        <div className="field">
          <p className="control has-icons-left">
            <input ref={this.inputPassword} className={`input ${passwordClass}`} type="password" placeholder="Password" />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
          {
            passwordError && <p class="help is-danger">{ passwordError }</p>
          }
        </div>

        <div className="field">
          <p className="control">
            <button onClick={this.loginButton} className="button is-success">
              Login
            </button>
          </p>
        </div>
      </div>
    )
  }
}

export default Login;
