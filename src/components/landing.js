import React, { Component } from 'react';
import axios from 'axios';
import bulmaCarousel from '../../node_modules/bulma-extensions/bulma-carousel/dist/bulma-carousel';
import '../styles/landing.css';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: null,
      stockNames: []
    };
    this.inputCompany = React.createRef();

    this.search = this.search.bind(this);
  }
  componentDidMount() {
    bulmaCarousel.attach();
    axios.get(`${process.env.REACT_APP_BASE_URL}/stocks`)
      .then(response => {
        this.setState({
          stockNames: response.data.map(stock => stock.name)
        });
      });
  }
  search(e) {
    e.preventDefault();

    const symbol = this.inputCompany.current.value;
    axios.get(`${process.env.REACT_APP_IEX_URL}/stock/${symbol}/quote`)
      .then(response => {
        this.setState({
          company: response.data
        })
      })
  }
  render () {
    return (
      <section className="hero is-medium has-carousel">
        <div className="hero-carousel carousel-animated carousel-animate-fade">
          <div className='carousel-container'>
            <div className='carousel-item has-background is-active'>
              <img className="is-background" src="https://www.bizeducator.com/wp-content/uploads/2016/12/investment-stratedgy-2.jpg" alt="" />
            </div>
            <div className='carousel-item has-background'>
              <img className="is-background" src="https://wikiki.github.io/images/life.jpg" alt="" />
            </div>
            <div className='carousel-item has-background'>
              <img className="is-background" src="https://thewallpaper.co/wp-content/uploads/2016/03/beautiful-forest-wallpaper-high-definition-desktop-wallpapers-hd-free-photos-awesome-houses-healthy-life-shed-country-houses-high-resolution-windows-desktop-images-2560x1600.jpg" alt="" />
            </div>
            <div className='carousel-item has-background'>
              <img className="is-background" src="https://www.wallpaperflare.com/static/143/832/1008/parachute-jump-synchronously-beautifully-group-wallpaper.jpg" alt="" />
            </div>
          </div>
          <div className="carousel-navigation is-overlay">
            <div className="carousel-nav-left">
              <i className="fa fa-chevron-left" aria-hidden="true"></i>
            </div>
            <div className="carousel-nav-right">
              <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <div className="hero-head">
          <nav className="navbar is-transparent">
            <div className="container">
              <div className="navbar-brand">
                <span className="navbar-burger burger" data-target="navbarMenuHeroA">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
            </div>
          </nav>
        </div>
        <div className="hero-body has-text-centered">
          <div className="columns is-mobile is-centered">
            <div className="column is-half is-narrow">
              <form onSubmit={this.search}>
                <div className="field has-addons">
                  <div className="control is-expanded">
                    <input
                      className="input is-rounded"
                      ref={this.inputCompany}
                      type="text"
                      placeholder="Enter a ticker symbol eg. aapl" />
                  </div>
                  <div className="control">
                    <button type="submit" className="button is-info is-rounded">
                      Search for a company
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="hero-foot smallHeader">
          <div className="container" style={{color: 'white', marginTop: '-100px', width: '40%', fontSize: '20px', textShadow: "1px 1px black"}}>
            {
              this.state.company &&
                <div>
                  <p><b>Company:</b> { this.state.company.companyName }</p>
                  <p><b>Symbol:</b> { this.state.company.symbol }</p>
                  <p><b>Latest Price:</b> { this.state.company.latestPrice } USD</p>
                  <p><b>Change from Previous Close:</b> { this.state.company.change } USD ({ (100 * this.state.company.changePercent).toFixed(2) }%)</p>
                </div>
            }
          </div>
        </div>
        <div>
        <nav class="tabs is-boxed is-fullwidth">
          <div class="container">
            <ul>
              <li><a class="has-text-white about">Practice Investing and Retire Happy</a></li>
            </ul>
          </div>
        </nav>
        </div>
      </section>
    )
  }
}

export default Landing;

 // <a className="navbar-item has-text-white is-active">
 //                    <b>Home</b>
 //                  </a>
