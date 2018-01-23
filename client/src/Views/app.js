import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink, Redirect } from 'react-router-dom';
import Home from './Home';
import SeedDisplay from './SeedDisplay';
import Organization from './Organization'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import UserLogon from '../Components/UserLogon'
import Logout from '../Components/Logout'
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
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <BrowserRouter>
        <Notifications>
          <div>
            <Navbar isLoggedIn={isLoggedIn}/>

            <Route exact path="/login" render={(props) => (
              <UserLogon {...props} login={() => this.changeLoggedIn(true)}/> 
            )}/>            

            <Route exact path="/" component={Home} />

            {/* <PrivateRoute path="/new" component={NewCard} /> */}
            <PrivateRoute path="/review" component={SeedDisplay} isLoggedIn={isLoggedIn}/>
            {/* <PrivateRoute path="/scheduled" component={ScheduledCards} /> */}
            {/* <PrivateRoute path="/archive" component={ArchivedCards} /> */}

            <Route path="/logout" render={(props) => (
              <Logout {...props} logout={() => this.changeLoggedIn(false)}/>
            )}/>
            <Footer/>
          </div>
        </Notifications>
      </BrowserRouter>
    )
  }
}

export default App;


const PrivateRoute = ({ isLoggedIn: isAuthenticated, component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)