import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Home/home-view.scss';
import './seedView.scss';
// import ActionButton from '../../Components/Button'
import Footer from '../../Components/Footer'
import Navbar from '../../Components/Navbar'
import Modal from 'react-bootstrap/lib/Modal'
// import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
// import Button from 'react-bootstrap/lib/Button';
// import PlantButton from '../../Components/PlantASeedButton';
// import UserLogon from '../../Components/UserLogon';
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
// import MainLogo from './images/logo.png'
import { Image } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
// import RedDress from './images/NewRedDressCrop.png'
// import LightBulb from './images/LightBulbCrop.png'
// import Flower from './images/flower.png'
import CardModal from '../../Components/CardModals'
import InfoCard from '../../Components/InfoCards'

class SeedView extends Component {

  onCardsUpdated = (cards) => {
    this.setState({cards});
  }

  componentWillMount() {
    this.context.subscribeForCardsUpdate(this.onCardsUpdated);
  }

  componentWillUnmount() {
    this.context.unsubscribeFromCardsUpdate(this.onCardsUpdated);
  }

  state = {
    cards: [],
  }

  render(){
    const cards = this.state.cards.filter((card) => card.notified);
    const filler = "You don't have any seeds to take care of yet. Check back later!" ;
    return (
      <div>
        <div className='home section1'>
          {/* <Grid > */}
          <Row className="logo-row">
            <Col xs={1} md={3}>
            </Col>
            <Col className="logo" xs={10} md={6}>
              {/* <CardModal /> */}
            </Col>
            <Col xs={1} md={3}>
            </Col>
          </Row>

          {(cards.length == 0) ? (
            <span className="fillerText">{filler}</span>
          ) : (
            cards.map((card) =>
            <Row key={card.id}>
              <InfoCard seed={card.seed} soil={card.soil}
                clicked={(e) => {
                  this.context.reactOnCard(card);
                }}/>
            </Row>      
            )
          )}
          {/* </Grid> */}
        </div>
      </div>
    );
  }
}

SeedView.contextTypes = {
  subscribeForCardsUpdate: PropTypes.func,
  unsubscribeFromCardsUpdate: PropTypes.func,
  reactOnCard: PropTypes.func,
}

export default SeedView;