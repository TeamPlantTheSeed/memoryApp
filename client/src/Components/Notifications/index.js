import {
  subscribeForNotifications as socketSubscribe,
  unsubscribeFromNotifications as socketUnsubscribe,
  reactOnCard as socketReact
} from './socket';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import Button from 'react-bootstrap/lib/Button';
import CardModal from "../CardModals/cardModal";

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
      unsubscribeFromCardsUpdate: this.unsubscribeFromCardsUpdate,
      deleteCard: this.deleteCard,
      updateCard: this.updateCard,
    };
  }

  subscribeForCardsUpdate = (subscriber) => {
    subscriber(this.state.allCards);
    this.subscribed = [ ...this.subscribed, subscriber ]
  }

  unsubscribeFromCardsUpdate = (subscriber) => {
    this.subscribed = this.subscribed.filter((x) => x != subscriber)
  }

  updateCards = (userID) => {
    axios.get(`/api/cards/user/${userID}`).then((resp) => {
      this.setState({allCards: resp.data});
      for (const subscriber of this.subscribed) {
        subscriber(resp.data);
      }  
    })
  }

  deleteCard = (card) => {
    axios.delete(`/api/cards/${card.id}`).then((resp) => {
      this.updateCards(this.state.userID);
    })
  }

  updateCard = (card) => {
    axios.put(`/api/cards/${card.id}`, {
      seed: card.seed,
      soil: card.soil,
    }).then((resp) => {
      this.updateCards(this.state.userID);
    })
  }

  reactOnCard = (card, answer) => {
    console.log('reactOnCard() requested with answer', answer, 'for card', card);
    socketReact(card, answer);
    this.updateCards(this.state.userID);
  }

  notificationsWatcher = (err, card) => {
    this.setState({
      card: card,
      show: true,
    })
    this.updateCards(this.state.userID);
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
    socketSubscribe(userID, this.notificationsWatcher);
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
    if (this.props.history.location.pathname != '/review') {
      const notification = new Notification(card.soil, options);
      notification.onclick = (x) => {
          window.focus();
          if (this.props.history.location.pathname != '/review') {
            this.props.history.push('/review');
          }
          notification.close();
      }
    }
  }



  handleHide = (bool) => {
    this.setState({ show: bool });
    if (this.props.history.location.pathname != '/review') {
      this.props.history.push('/review');
    }
  }

  // openModal = () => {
  //   this.setState({ show: true })
  // };


  render() {
    const card = this.state.card;
    return (
      <div>
        {/* <CardModal show={this.state.show} close_modal={this.handleHide}
          seed={card.seed} soil={card.soil}/> */}
        { this.props.children }
      </div>
    );
  }
};

Notifications.childContextTypes = {
  subscribeForNotifications: PropTypes.func,
  unsubscribeFromNotifications: PropTypes.func,
  reactOnCard: PropTypes.func,
  deleteCard: PropTypes.func,
  updateCard: PropTypes.func,
  updateCards: PropTypes.func,
  subscribeForCardsUpdate: PropTypes.func,
  unsubscribeFromCardsUpdate: PropTypes.func,
};


// Pass from one componen tto another 
// Props
// Functio
// state, 
// data

export default withRouter(Notifications);

