import React from 'react';
import { BrowserRouter, Route, NavLink, Redirect } from 'react-router-dom';
import Home from './Home';
import SeedDisplay from './SeedDisplay';
import Organization from './Organization'
// import MainButtons from '../Components/Button'
import MyNavbar from '../Components/Navbar'
import UserLogon from '../Components/UserLogon'
import Notifications from '../Components/Notifications'

import './app.scss'

export default props => (
  <BrowserRouter>
    <Notifications>
      <div>
        {/* TODO: Move NavBar here from Home screen,
          using NavLink components for individual links */}
        <Route exact path="/" component={Home} />
        {/* TODO: Replace with LoginForm */}
        <Route exact path="/login" component={UserLogon} />
        {/* <PrivateRoute path="/new" component={NewCard} /> */}
        <Route path="/review" component={SeedDisplay} />
        {/* <PrivateRoute path="/scheduled" component={ScheduledCards} /> */}
        {/* <PrivateRoute path="/archive" component={ArchivedCards} /> */}
      </div>
    </Notifications>
  </BrowserRouter>
)

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)