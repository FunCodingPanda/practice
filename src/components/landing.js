import React, { Component } from 'react';
import bulmaCarousel from '../../node_modules/bulma-extensions/bulma-carousel/dist/bulma-carousel';
import '../styles/landing.css';

class Landing extends Component {
  componentDidMount() {
    bulmaCarousel.attach();
  }
  render () {
    return (
      <section class="hero is-medium has-carousel">
        <div class="hero-carousel carousel-animated carousel-animate-fade">
          <div class='carousel-container'>
            <div class='carousel-item has-background is-active'>
              <img class="is-background" src="https://www.bizeducator.com/wp-content/uploads/2016/12/investment-stratedgy-2.jpg" alt="" />
            </div>
            <div class='carousel-item has-background'>
              <img class="is-background" src="https://wikiki.github.io/images/life.jpg" alt="" />
            </div>
            <div class='carousel-item has-background'>
              <img class="is-background" src="https://internationalbanker.com/wp-content/uploads/2017/12/Investing-1170x650.jpg" alt="" />
            </div>
            <div class='carousel-item has-background'>
              <img class="is-background" src="https://www.wallpaperflare.com/static/143/832/1008/parachute-jump-synchronously-beautifully-group-wallpaper.jpg" alt="" />
            </div>
          </div>
          <div class="carousel-navigation is-overlay">
            <div class="carousel-nav-left">
              <i class="fa fa-chevron-left" aria-hidden="true"></i>
            </div>
            <div class="carousel-nav-right">
              <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <div class="hero-head">
          <nav class="navbar is-transparent">
            <div class="container">
              <div class="navbar-brand">
                <span class="navbar-burger burger" data-target="navbarMenuHeroA">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
              <div id="navbarMenuHeroA" class="navbar-menu">
                <div class="navbar-end">
                  <a class="navbar-item has-text-white is-active">
                    <b>Home</b>
                  </a>
                  <span class="navbar-item has-text-white">
                    <a class="button is-link is-inverted is-rounded">
                      <span>Search Companies</span>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div class="hero-body has-text-centered">
          <div class="columns is-mobile is-centered">
            <div class="column is-half is-narrow">
              <div class="field has-addons">
                <div class="control is-expanded">
                  <input class="input" type="text" placeholder="Search for a Company" />
                </div>
                <div class="control">
                  <a class="button is-info">
                    Search
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hero-foot smallHeader">
          <nav class="tabs is-boxed is-fullwidth">
            <div class="container">
              <ul>
                <li class="is-active"><a>About</a></li>
                <li><a class="has-text-white">Financial Analysis</a></li>
                <li><a class="has-text-white">Grid</a></li>
                <li><a class="has-text-white">Elements</a></li>
                <li><a class="has-text-white">Components</a></li>
                <li><a class="has-text-white">Layout</a></li>
              </ul>
            </div>
          </nav>
        </div>
      </section>
    )
  }
}

export default Landing;
