import React, { Component } from 'react';
import '../styles/About.css';

class About extends Component {
  render () {
    return (
        <div class="container box">
          {/*<div class="notification box2">*/}
            <h1 className='navbarHeader'>About</h1>

            This website allows potential investors to practice investing in stocks before investing
            in them in real life. Then the potential investor will gain the experience he or she needs
            to become a successful investor in addition to gaining the confidence he or she needs to invest 
            through banks and online platforms such as Robinhood. 

          </div>
    )
  }
}

export default About;