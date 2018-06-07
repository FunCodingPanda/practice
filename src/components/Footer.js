import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

class Footer extends Component {
  render () {
    return (
      <footer class="footer foot">
        <div class="container">
          <div class="content has-text-centered">
            <p>
              <strong>Smart Investing</strong> by <a href="https://funcodingpanda.com">Sophie Ngo</a>. The website content
              is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
            </p>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;
