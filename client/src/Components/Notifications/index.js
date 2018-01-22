import {
  subscribeForNotifications as socketSubscribe,
  unsubscribeFromNotifications as socketUnsubscribe,
  reactOnCard as socketReact
} from './socket';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import CardModal from "../CardModals/cardModal";
import Button from 'react-bootstrap/lib/Button';

class Notifications extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    card: {},
    allCards: [],
    show: false,
    userID: null,
  }

  subscribed = []

  getChildContext() {
    return {
      // SocketIO interface
      subscribeForNotifications: this.subscribeForNotifications,
      unsubscribeFromNotifications: this.unsubscribeFromNotifications,
      reactOnCard: this.reactOnCard,

      // API interface
      updateCards: this.updateCards,
      subscribeForCardsUpdate: this.subscribeForCardsUpdate,
    };
  }

  subscribeForCardsUpdate = (subscriber) => {
    this.subscribed = [ ...this.subscribed, subscriber ]
  }

  updateCards = (userID) => {
    // TODO: API call /api/users/<id>/cards
    const cards = []
    for (const subscriber of this.subscribed) {
      subscriber(cards)
    }
  }

  reactOnCard = (cardID, answer) => {
    socketReact(cardID, answer)
  }

  notificationsWatcher = (err, card) => {
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
  }

  subscribeForNotifications = (userID) => {
    this.setState({userID});
    socketSubscribe(userID, this.notificationsWatcher)
  }

  unsubscribeFromNotifications = () => {
    socketUnsubscribe(this.state.userID, this.notificationsWatcher);
    this.setState({userID: null});    
  }

  showNotification = card => {
    const options = {
      'body': card.seed,
      'icon': 'https://www.iconexperience.com/_img/o_collection_png/green_dark_grey/512x512/plain/leaf.png',
      'requireInteraction': true,
    }
    const notification = new Notification(card.soil, options);
    notification.onclick = (x) => {
        window.focus();
        this.props.history.push('/review');
        notification.close();
    }
  }



  handleHide = (bool) => {
    this.setState({ show: bool });
    this.props.history.push('/review');
  }

  // openModal = () => {
  //   this.setState({ show: true })
  // };


  render() {
    const card = this.state.card;
    return (
      <div>
        <CardModal show={this.state.show} close_modal={this.handleHide}
          seed={card.seed} soil={card.soil}/>
        { this.props.children }
      </div>
    );
  }
};

Notifications.childContextTypes = {
  subscribeForNotifications: PropTypes.func,
  unsubscribeFromNotifications: PropTypes.func,
  reactOnCard: PropTypes.func,
  updateCards: PropTypes.func,
  subscribeForCardsUpdate: PropTypes.func,
};


// Pass from one componen tto another 
// Props
// Functio
// state, 
// data

export default withRouter(Notifications);

