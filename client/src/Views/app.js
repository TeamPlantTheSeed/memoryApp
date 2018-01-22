import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Home from './Home';
import Organization from './Organization'
import MainButtons from '../Components/Button'
import MyNavbar from '../Components/Navbar'
import Notifications from '../Components/Notifications'

import './app.scss'


export default props => (
  <div>
    <Notifications />
    <BrowserRouter>
      <div className="navbar">

        <Route exact path="/" component={Home} />
        <Route path="/organization" component={Organization} />
        
        

      </div>
    </BrowserRouter>
  </div>
)



