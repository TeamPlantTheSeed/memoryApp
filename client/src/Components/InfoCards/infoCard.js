import React from "react";
import './infoCard.scss';
import Modal from 'react-bootstrap/lib/Modal'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Form from 'react-bootstrap/lib/Form';
import { Col } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import Flower from './images/flowerbloom@3x.png'
import { Panel } from 'react-bootstrap';



const InfoCard = (props) => (
	<div>
		<Form horizontal className="white">
			<Col md={2} sm={0}>
			</Col>
			<Col md={8} sm={12}>
				<Panel className="panel-body">
					<Panel.Body>
						<Form horizontal className="seedInfo">
							<Col md={8} sm={12} className="">
								<FormGroup className="head-FormGroup">
									<Col md={12}>
									<Panel.Heading className="seedHead">
										Remember This Seed?
									</Panel.Heading>
									</Col>
								</FormGroup>
								<FormGroup className="FormGroup">
									<Col md={3}>
									<h3 id="head-seed">Your Seed</h3>
								</Col>
									<Col md={9}>
									<h3 id="remind-seed"><i>Teddy Ruxpin</i></h3>
								</Col>
								</FormGroup>
								<FormGroup className="FormGroup">
									<Col md={3}>
									<h3 id="head-soil">Your Soil</h3>
								</Col>
									<Col md={9}>
									<h3 id="remind-soil"><i>That teddy bear from the commercial.</i></h3>
								</Col>
								</FormGroup>
							</Col>
							<Col md={4} sm={12} className="some-image">
								<FormGroup>
								<Col md={12}>
									<div>
										<img src={Flower} width={100} height={100} alt="flower" />
									</div>
								</Col>
								</FormGroup>
								<FormGroup>
								<Col md={12}>
									<div>
										<Button className="dismiss-btn">Dismiss</Button>
									</div>
								</Col>
								</FormGroup>
							</Col>
							..........			
				{/* <h4 id="remind-soil"><i>{props.soil}</i></h4>
			
			<img src={Flower} width={100} height={100} alt="flower"
				onClick={props.clicked}/> */}
............
						</Form>
					</Panel.Body>
				</Panel>
			</Col>
			<Col md={2} sm={0}>
			</Col>
		</Form>
	</div>




);

export default InfoCard;