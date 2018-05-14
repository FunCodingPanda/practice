import React from 'react'
import { Switch, Route } from 'react-router-dom'
import About from './About'
import Account from './Account'
import AllCompanies from './AllCompanies'
import Landing from './Landing'
import Login from './Login'
import Signup from './Signup'

// The Main component renders one of the three provided
// Routes (provided that one matches). Eg. Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <div>
    <Switch>
      <Route exact path='/' component={Landing}/>
      <Route exact path='/signup' component={Signup}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/about' component={About}/>
      <Route exact path='/AllCompanies' component={AllCompanies}/>
      <Route exact path='/account' component={Account}/>
    </Switch>
  </div>
)

export default Main;
