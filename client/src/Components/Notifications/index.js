import { subscribeToNotifications } from './socket';
import React, { Component } from 'react';

class Notifications extends Component {
  constructor(props) {
    super(props);
    subscribeToNotifications((err, card) => {
      this.setState({
        card
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
    card: {}
  }

  showNotification = card => {
    const options = {
      'body': card.seed,
      'icon': 'https://www.iconexperience.com/_img/o_collection_png/green_dark_grey/512x512/plain/leaf.png'
    }
    const nn = new Notification(card.soil, options);
    nn.onclick = function(x) {
        window.focus()
        nn.close()
    }
  }

  render() {
    const card = this.state.card;
    return (

      <div className="App">
        <p className="App-intro white">
          [{card.shownCount}/3] This is the card: {card.soil}? {card.seed}!
        </p>
      </div>

    );
  }
};

export default Notifications;

