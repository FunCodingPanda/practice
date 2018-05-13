import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Navbar.css';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      errors: null
    };
    this.inputName = React.createRef();
    this.inputEmail = React.createRef();
    this.inputPassword = React.createRef();
    this.inputConfirmPassword = React.createRef();

    this.submitForm = this.submitForm.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  submitForm(e){
    const name = this.inputName.current.value;
    const email = this.inputEmail.current.value;
    const password = this.inputPassword.current.value; 
    const confirmPassword = this.inputConfirmPassword.current.value;
    const data = {
      name,
      email,
      password,
      confirmPassword
    };

    axios.post('http://localhost:3000/users', data)
      .then(response => {
        if (response.status === 201 && response.data.auth) {
          localStorage.setItem('auth', JSON.stringify(response.data.auth));
          localStorage.setItem('userId', response.data.user.id);
        }
        window.location.assign('./account');
      });
  }

  validateEmail() {
    const email = this.inputEmail.current.value;
    if (!email.match(/\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/gm)) {
      this.setState({
        errors: {
          email: 'This email is invalid'
        }
      })
    } else {
      this.setState({
        errors: {
          email: ''
        }
      })
    }
  }

  render () {
    let emailError = '', emailClass = '';
    if (this.state.errors && this.state.errors.email) {
      emailError = this.state.errors.email;
      emailClass = 'is-danger';
    }
    return (
      <div className='authContainer'>
        <h1 className='navbarHeader'> Signup </h1>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input ref={this.inputName} className="input" type="text" placeholder="Text input"/>
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-left has-icons-right">
            <input
              ref={this.inputEmail}
              className={`input ${emailClass}`}
              type="email"
              placeholder="Email input"
              onBlur={this.validateEmail} />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle"></i>
            </span>
          </div>
          { emailError && <p className="help is-danger">{ emailError }</p> }
        </div>
     

      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input ref={this.inputPassword} className="input" type="password" placeholder="Text input" />
        </div>
      </div>

      <div className="field">
        <label className="label">Confirm Password</label>
        <div className="control">
          <input ref={this.inputConfirmPassword} className="input" type="password" placeholder="Text input" />
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button onClick={this.submitForm} className="button is-link is-rounded">Submit</button>
        </div>
        <div className="control">
          <button className="button is-text">Cancel</button>
        </div>
      </div>
    </div>
    )
  }
}

export default Signup;