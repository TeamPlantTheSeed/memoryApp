import React, { Component } from 'react';
import '../Home/home-view.scss';
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

const isLoggedIn = true;

class SeedView extends Component {

  state = {
    card: {
      seed: 'Danny.',
      soil: 'That guy that i met on the plane today.'
    }
  }

  render(){
    const card = this.state.card;
    return (
      <div>
        <Navbar isLoggedIn={isLoggedIn} />
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
          <Row>
            <InfoCard seed={card.seed} soil={card.soil}/>
          </Row>
          
          {/* </Grid> */}
        </div>
        <Footer />
      </div>
    );
  }
}
export default SeedView;