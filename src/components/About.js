import React, { Component } from 'react';
import '../styles/About.css';

class About extends Component {
  render () {
    return (
        <div class="container box">
          {/*<div class="notification box2">*/}
            <h1 className='navbarHeader'>About</h1>
            <p>
            It is an application for people to gain valuable investing experience to practice and prepare them 
            for real life investing. The idea behind this is to educate people financially. You will receive a 
            set amount of fictitious cash, and it is up to you on what you want to invest it.  This application 
            has real-time stock prices, and dividends are properly allocated according to its ex-dividend and 
            payable date. Ex-dividend date is the day you would have to hold that particular stock until in order 
            to receive the dividends on the payable date. You will not receive dividend if you purchase the stock 
            on ex-dividend date. This website also has financial ratios that is normally used to financial analyze 
            company.  
            </p>
            {'\n'}
            <p>Why Invest ? </p> 
            <p> 1. Grow your money </p>
            <p>2. Earn higher returns compared to the bank</p>
            <p>3. Potentially reduce a lot of tax income</p>
            <p>4. Not a victim to inflation</p>
            <p>5. Save for retirement</p>
            <p>6. Experience</p>
            <p>7. Reach Financial Goals</p>
            <p>8. Be a part of a new venture   </p>
            {'\n'}
            <p>If you have any questions, please do not hesitate to email me at sophie4ngo@gmail.com. Connect with me on 
            <a href="https://www.linkedin.com/in/sophie-ngo-6623b0a3/"> Linkedin.</a></p>
          </div>
    )
  }
}

export default About;