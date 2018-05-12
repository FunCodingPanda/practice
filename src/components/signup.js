import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Navbar.css';

class signup extends Component {
  constructor(props){
    super(props);
    this.inputName = React.createRef();
    this.inputEmail = React.createRef();
    this.inputPassword = React.createRef();
    this.inputConfirmPassword = React.createRef();
    this.submitForm = this.submitForm.bind(this);
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
  }

  render () {
    return (
      <div>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input ref={this.inputName} className="input" type="text" placeholder="Text input"/>
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-left has-icons-right">
            <input ref={this.inputEmail} className="input is-danger" type="email" placeholder="Email input" />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle"></i>
            </span>
          </div>
          <p className="help is-danger">This email is invalid</p>
        </div>
     

      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input ref={this.inputPassword} className="input" type="text" placeholder="Text input" />
        </div>
      </div>

      <div className="field">
        <label className="label">Confirm Password</label>
        <div className="control">
          <input ref={this.inputConfirmPassword} className="input" type="text" placeholder="Text input" />
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button onClick={this.submitForm} className="button is-link">Submit</button>
        </div>
        <div className="control">
          <button className="button is-text">Cancel</button>
        </div>
      </div>
    </div>
    )
  }
}

export default signup;