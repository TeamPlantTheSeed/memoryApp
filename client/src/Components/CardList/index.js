import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import InfoCard from '../InfoCards'
import PlantASeedButton from '../PlantASeedButton'
import './cardList.scss';

class CardList extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      cards: [],
      extras: [],
      config: {},
      time: null,
      showEditor: false,
    }

    if (props.type == 'scheduled') {
      axios.get('/api/config').then((resp) => {
        this.setState({config: resp.data});
        setInterval(() => {
          this.setState({time: new Date()});
        }, 1000)
      })
    }
  }

  onCardsUpdated = (cards) => {
    this.setState({cards});
  }

  componentWillMount() {
    this.context.subscribeForCardsUpdate(this.onCardsUpdated);
  }

  componentWillUnmount() {
    this.context.unsubscribeFromCardsUpdate(this.onCardsUpdated);
  }

  animateAnswer = (card, answer) => {
    if (card.shownCount < 2) {
      return this.context.reactOnCard(card);
    }

    const tmpCard = {...card, correct: (card.seed == answer)};
    this.setState({
      extras: [...this.state.extras, tmpCard],
      cards: this.state.cards.filter((exCard) => exCard.id != tmpCard.id),
    });
    setTimeout(() => {
      this.setState({extras: this.state.extras.filter((exCard) => exCard.id != tmpCard.id)});
    }, 5000);
    this.context.reactOnCard(card, answer);
  }

  editCard = (card) => {
    this.setState({showEditor: card});
  }

  actions = {
    active: this.animateAnswer,
    archived: this.context.deleteCard,
    scheduled: this.editCard,
  }

  render(){
    const cards = this.state.cards.filter(this.props.filter);
    const extras = this.state.extras;
    return (
      <div>
        {!this.state.showEditor ? "" : (
          <PlantASeedButton action={this.context.updateCard} card={this.state.showEditor}/>
        )}
        <div className='section1'>
          <Row className="logo-row">
            <Col xs={1} md={3}>
            </Col>
            <Col className="logo" xs={10} md={6}>
            </Col>
            <Col xs={1} md={3}>
            </Col>
          </Row>

          {(cards.length + extras.length === 0) ? (
            <span className="fillerText">{this.props.filler}</span>
          ) : ("")}
          {
            extras.map((card) =>
              <Row key={card.id}>
                <InfoCard card={card} type="extra"
                  action={(e) => {}}/>
              </Row>      
            )
          }
          {
            cards.map((card) =>
              <Row key={card.id}>
                <InfoCard card={card} type={this.props.type}
                  action={this.actions[this.props.type]}
                  config={this.state.config} time={this.state.time}/>
              </Row>      
            )
          }
          )}
        </div>
      </div>
    );
  }
}

CardList.contextTypes = {
  subscribeForCardsUpdate: PropTypes.func,
  unsubscribeFromCardsUpdate: PropTypes.func,
  reactOnCard: PropTypes.func,
  deleteCard: PropTypes.func,
  updateCard: PropTypes.func,
}

export default CardList;