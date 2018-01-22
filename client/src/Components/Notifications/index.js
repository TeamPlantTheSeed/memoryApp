import { subscribeToNotifications } from './socket';
import React, { Component } from 'react';
import CardModal from "../CardModals/cardModal";
import Button from 'react-bootstrap/lib/Button';

class Notifications extends Component {
  constructor(props) {
    super(props);
    subscribeToNotifications((err, card) => {
      this.setState({
        card: card,
        show: true,
      })
      // Let's check whether notification permissions have already been granted
      if (Notification.permission === "granted") {
        this.showNotification(card);
        // Otherwise, we need to ask the user for permission
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission(function (permission) {
          if (permission === "granted") {
            this.showNotification(card);
          }
        })
      }
    })
  }
  state = {
    card: {},
    show: false,
  }

  showNotification = card => {
    const options = {
      'body': card.seed,
      'icon': 'https://www.iconexperience.com/_img/o_collection_png/green_dark_grey/512x512/plain/leaf.png',
      'requireInteraction': true,
    }
    const nn = new Notification(card.soil, options);
    nn.onclick = function(x) {
        window.focus();
        window.location.pathname = '/review';
        nn.close();
    }
  }



  handleHide = (bool) => {
    this.setState({ show: bool });
    window.location.pathname = '/review';
  }

  // openModal = () => {
  //   this.setState({ show: true })
  // };


  render() {
    const card = this.state.card;
    return (
      <CardModal show={this.state.show} close_modal={this.handleHide}
        seed={this.state.card.seed} soil={this.state.card.soil}/>
    );
  }
};

// Pass from one componen tto another 
// Props
// Functio
// state, 
// data

export default Notifications;

