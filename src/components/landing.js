import React, { Component } from 'react';
import bulmaCarousel from '../../node_modules/bulma-extensions/bulma-carousel/dist/bulma-carousel';
import '../styles/landing.css';

class Landing extends Component {
  componentDidMount() {
    bulmaCarousel.attach();
  }
  render () {
    return (
      <section className="hero is-medium has-carousel">
        <div className='hero-carousel carousel-animated carousel-animate-slide' data-autoplay="true">
          <div className='carousel-container'>
            <div className='carousel-item has-background is-active'>
              <img className="is-background" src="https://www.bizeducator.com/wp-content/uploads/2016/12/investment-stratedgy-2.jpg" alt="" />
              <div className="title">Practice Investing</div>
            </div>
            <div className='carousel-item has-background'>
              <img className="is-background" src="https://wikiki.github.io/images/life.jpg" alt="" />
              <div className="title"> Save</div>
            </div>
            <div className='carousel-item has-background'>
              <img className="is-background" src="https://www.runningalpha.com/wp-content/uploads/2014/11/blue-poster-img.png" alt="" />
              <div className="title">Invest</div>
            </div>
            <div className='carousel-item has-background'>
              <img className="is-background" src="https://www.wallpaperflare.com/static/143/832/1008/parachute-jump-synchronously-beautifully-group-wallpaper.jpg" alt="" />
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
      </section>
    )
  }
}

export default Landing;
