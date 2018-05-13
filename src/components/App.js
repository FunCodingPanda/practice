import React, { Component } from 'react';
import '../styles/App.css';

import Navbar from './Navbar';
// import Landing from './landing'
import Main from './Main'



class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Main />
      </div>
    );
  }
}

export default App;
