import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink, Redirect } from 'react-router-dom';
import Home from './Home';
import SeedDisplay from './SeedDisplay';
import Organization from './Organization'
// import MainButtons from '../Components/Button'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import UserLogon from '../Components/UserLogon'
import Notifications from '../Components/Notifications'

import './app.scss'

class App extends Component {

  state = {
    isLoggedIn: false,
  }

  changeLoggedIn = (isLoggedIn) => {
    this.setState({isLoggedIn});
  }

  render() {
    return (
      <BrowserRouter>
        <Notifications>
          <div>
            <Navbar isLoggedIn={this.state.isLoggedIn}
              changeLoggedIn={this.changeLoggedIn}/>
            <Route exact path="/" component={Home} />
            {/* TODO: Replace with LoginForm */}
            <Route exact path="/login" component={UserLogon} />
            {/* <PrivateRoute path="/new" component={NewCard} /> */}
            <Route path="/review" component={SeedDisplay} />
            {/* <PrivateRoute path="/scheduled" component={ScheduledCards} /> */}
            {/* <PrivateRoute path="/archive" component={ArchivedCards} /> */}
            <Footer/>
          </div>
        </Notifications>
      </BrowserRouter>
    )
  }
}

export default App;


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