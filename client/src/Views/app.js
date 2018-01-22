import React from 'react';
import { BrowserRouter, Route, NavLink, Redirect } from 'react-router-dom';
import Home from './Home';
import ReviewCards from './ReviewCards';
import Organization from './Organization'
// import MainButtons from '../Components/Button'
import MyNavbar from '../Components/Navbar'
import UserLogon from '../Components/UserLogon'
import Notifications from '../Components/Notifications'

import './app.scss'


export default props => (
  <div>
    <Notifications />
    <BrowserRouter>
    <div>
      {/* TODO: Move NavBar here from Home screen,
          using NavLink components for individual links */}
      <div className="navbar">

        <NavLink to="/new"
          activeClassName="active-link">New Card</NavLink> | 
        <NavLink to="/review"
          activeClassName="active-link">For Review</NavLink> | 
        <NavLink to="/scheduled" className="disabled-link"
          activeClassName="active-link">Scehduled Reminders</NavLink>
        <NavLink to="/archive" className="disabled-link"
          activeClassName="active-link">Archive</NavLink> 

      </div>

        <Route exact path="/" component={Home} />
        {/* TODO: Replace with LoginForm */}
        <Route exact path="/login" component={UserLogon} />
        {/* <PrivateRoute path="/new" component={NewCard} /> */}
        <Route path="/review" component={ReviewCards} />
        {/* <PrivateRoute path="/scheduled" component={ScheduledCards} /> */}
        {/* <PrivateRoute path="/archive" component={ArchivedCards} /> */}
      </div>
    </BrowserRouter>
  </div>
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