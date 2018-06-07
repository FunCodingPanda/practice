import React from 'react'
import { Switch, Route } from 'react-router-dom'
import About from './About'
import Account from './Account'
import AllCompanies from './AllCompanies'
import Landing from './landing'
import Login from './login'
import Signup from './signup'
import AccountHistory from './AccountHistory'

const Main = () => (
  <Switch>
    <Route exact path='/' component={Landing}/>
    <Route exact path='/signup' component={Signup}/>
    <Route exact path='/login' component={Login}/>
    <Route exact path='/about' component={About}/>
    <Route exact path='/AllCompanies' component={AllCompanies}/>
    <Route exact path='/account' component={Account}/>
    <Route exact path='/AccountHistory' component={AccountHistory}/>
  </Switch>
)

export default Main;
