import { subscribeToNotifications } from './socket';
import React, { Component } from 'react';
import CardModal from "../CardModals/cardModal";
import Button from 'react-bootstrap/lib/Button';

import './socket.css';

class Notifications extends Component {
  constructor(props) {
    super(props);
    subscribeToNotifications((err, card) => {
      this.setState({
        card
      })
      // Let's check whether notification permissions have already been granted
      if (Notification.permission === "granted") {
        const notification = new Notification(card);
        // Otherwise, we need to ask the user for permission
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission(function (permission) {
          if (permission === "granted") {
            // const notification = new Notification(card);
            const options = {
              'body': 'body',
              'icon': 'https://www.iconexperience.com/_img/o_collection_png/green_dark_grey/512x512/plain/leaf.png'
            }
            const nn = new Notification(card, options);
            nn.onclick = function (x) {
              window.focus()
              nn.close()
            }
          }
        })
      }
    })
  }
  state = {
    card: 'no card yet'
  }



  handleHide = (bool) => {
    this.setState({ show: bool });
  }

  openModal = () => {
    this.setState({ show: true })
  };


  render() {
    const card = this.state.card;
    return (
      <div className="App">
        <p className="App-intro white">
          [{card.shownCount}/3] This is the card: {card.soil}? {card.seed}!
          <button onClick = {this.openModal}> Notifications </button>

          <CardModal show = {this.state.show} close_modal = {this.handleHide}/>
        </p>
      </div>

    );
  }
};

// Pass from one componen tto another 
// Props
// Functio
// state, 
// data

export default Notifications;

