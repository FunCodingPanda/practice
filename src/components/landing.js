import React, { Component } from 'react';
import '../styles/landing.css';

class Landing extends Component {
  render () {
    return (
      <div className='carousel carousel-animated carousel-animate-slide' data-autoplay="true">
        <div className='carousel-container'>
          <div className='carousel-item has-background is-active'>
            <img className="is-background" src="https://www.bizeducator.com/wp-content/uploads/2016/12/investment-stratedgy-2.jpg" alt="" width="640" height="310" />
            <div className="title">Practice Investing</div>
          </div>
          <div className='carousel-item has-background'>
            <img className="is-background" src="https://wikiki.github.io/images/life.jpg" alt="" width="640" height="310" />
            <div className="title"> Save <a href="https://lasongbox.com" target="_blank"></a></div>
          </div>
          <div className='carousel-item has-background'>
            <img className="is-background" src="https://www.runningalpha.com/wp-content/uploads/2014/11/blue-poster-img.png" alt="" width="640" height="310" />
            <div className="title">Invest</div>
          </div>
          <div className='carousel-item has-background'>
            <img className="is-background" src="https://www.wallpaperflare.com/static/143/832/1008/parachute-jump-synchronously-beautifully-group-wallpaper.jpg" alt="" width="640" height="310" />
            <div className="title">Live life to the fullest</div>
          </div>
        </div>
        <div className="carousel-navigation is-centered">
          <div className="carousel-nav-left">
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
          </div>
          <div className="carousel-nav-right">
            <i className="fa fa-chevron-right" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing;
