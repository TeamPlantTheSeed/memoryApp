import React, { Component } from 'react';
import './review-cards-view.css';

import InfoCard from '../../Components/InfoCards'

class ReviewCards extends Component {

  state = {
    card: {}
  }

  render() {
    const card = this.state.card;
    return (
      <div className="App">
        <p className="App-intro white">
          [{card.shownCount}/3] This is the card: {card.soil}? {card.seed}!
            </p>
        <InfoCard/>
      </div>

    );
  }
}

export default ReviewCards;
