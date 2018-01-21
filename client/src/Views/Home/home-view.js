import React from 'react';
import './home-view.scss';
import ActionButton from '../../Components/Button'
import Footer from '../../Components/Footer'
import Navbar from '../../Components/Navbar'
import Modal from 'react-bootstrap/lib/Modal'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import PlantButton from '../../Components/PlantASeedButton';
import UserLogon from '../../Components/UserLogon';
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import MainLogo from './images/logo.png'
import { Image } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import RedDress from './images/NewRedDressCrop.png'
import LightBulb from './images/LightBulbCrop.png'
import Flower from './images/flower.png'
import CardModal from '../../Components/CardModals'

//image for main logo
const imageResponsiveInstance = <Image src={MainLogo} responsive />;
const RedDressResponsive = <Image src={RedDress} responsive />;
const LightBulbResponsive = <Image src={LightBulb} responsive />;
const FlowerResponsive = <Image src={Flower} responsive />;

//for button state change
const isLoggedIn = false;


export default props =>
  <div>
    <Navbar isLoggedIn={isLoggedIn} />
    <div className='home section1'>
      {/* <Grid > */}
      <Row className="logo-row">
        <Col xs={1} md={0}>
        </Col>
        <Col className="logo" xs={10} md={12}>
          {<img responsive src={MainLogo} alt="logo" />}
        </Col>
        <Col xs={1} md={0}>
        </Col>
      </Row>
      <Row>
        <h4>LEARN MORE</h4>
        <Glyphicon className="glyph" glyph="glyphicon glyphicon-menu-down" />
      </Row>
      {/* </Grid> */}
    </div>

    {/* section 2 */}

    <div className='home section2'>
      <Grid >
        <Row className="logo-row">
          <Col xs={12} md={6}>
            {RedDressResponsive}
          </Col>
          <Col className="questions" xs={12} md={6}>
            <ul className="list">
              <li><h2>Are you often unable to remember important facts or figures?</h2></li>
              <li><h2>Do you forget people's names at the worst moments?</h2></li>
              <li><h2>Are you ever asked a question, and you should know the answer, but you struggle to form an intelligent reply?</h2></li>
              <li><h2>Have you ever forgotten a special occasion, birthday, or anniversary?</h2></li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
          </Col>
          <Col md={8}>
            <h2 className="commit" >Now you can easily commit these ‘seeds’
to long term memory using proven methods.</h2>
          </Col>
          <Col md={2}>
          </Col>
        </Row>
        <Row>
          <h4>TEACH ME HOW!</h4>
          <Glyphicon className="glyph" glyph="glyphicon glyphicon-menu-down" />
        </Row>
      </Grid>
    </div>

    {/* section 3 */}

    <div className='home section3'>

      <Row >
        <Col xs={1} md={1}>
        </Col>
        <Col className="sec3-tagline" xs={10} md={10}>
          <h3 className="easy-text" >It’s as easy as …</h3>
        </Col>
        <Col xs={1} md={1}>
        </Col>
      </Row>
      <Grid >
        <Row className="step-col">
          <Col className="flower" xs={12} md={2}>
            {FlowerResponsive}
          </Col>
          <Col className="steps" xs={12} md={5}>
            <Row className="row-1">
              <Col className="lg-nums" md={2}>
                1.
              </Col>
              <Col className="step-list" md={10}>
                <h2>Input what you want to learn as the ‘seed’, and a reminder item that helps you learn it, as the ‘soil’.</h2>
              </Col>
            </Row>
            <Row className="row-2">
              <Col className="lg-nums" md={2}>
                2.
              </Col>
              <Col className="step-list" md={10}>
                <h2>Periodic prompts will pop up to help you grow your ‘seed’. This will plant it into your memory with <u>repetition</u>.</h2>
              </Col>
            </Row>
            <Row className="row-3">
              <Col className="lg-nums" md={2}>
                3.
              </Col>
              <Col className="step-list" md={10}>
                <h2>On your final prompt, your ‘seed’ will fully blossom, rooting it to memory using a proven <u>retention</u> technique.</h2>
                <UserLogon />
               {/* took out history = {props.history.push} in the above component */}
              </Col>
            </Row>
            <CardModal />
          </Col>
          <Col className="lightbulb" xs={12} md={5}>
            {LightBulbResponsive}
            {/* lightbulb guy image */}
          </Col>
        </Row>
      </Grid>
      <Footer />
    </div>
  </div>


