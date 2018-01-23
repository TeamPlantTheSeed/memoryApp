import React from "react";
import Modal from 'react-bootstrap/lib/Modal'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Form from 'react-bootstrap/lib/Form';
import { Label } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import humanizeDuration from 'humanize-duration';
import './infoCard.scss';
import Leaf1 from './images/leaf1@3x.png'
import Leaf2 from './images/leaf2@3x.png'
import Bud from './images/bud@3x.png'
import Bloom from './images/flowerbloom@3x.png'

const style = (card, type) => {
	switch (type) {
		case "scheduled":
			return "remind-seed blurred-seed"
		case "active":
			if (card.shownCount > 1) {
				return "invisible-seed"
			}
		case "extra":
			switch (card.correct) {
				case true:
					return "remind-seed correct-seed"
				case false:
					return "remind-seed incorrect-seed"
			}
		default:
			return "remind-seed"
		}
}

const title = (card, type) => {
	switch (type) {
		case "archived":
			return "Delete"
		case "scheduled":
			return "Edit"
		case "active":
			return (card.shownCount < 2) ? "Dismiss" : "Submit"
		default:
			return ""
	}
}

const image = (card, type) => {
	switch (type) {
		case "archived":
			return Bloom
		case "extra":
			switch (card.correct) {
				case true:
					return Bloom
				case false:
					return Leaf2
			}
	}

	switch (card.shownCount) {
		case 0:
			return Leaf1
		case 1:
			return Leaf2
		default:
			return Bud
	}
}

const inputValues = {};

const inputBox = (card, type) => {
	if (type != "active" || card.shownCount < 2) {
		return "";
	}
	return (
		<FormGroup bsSize="large">
			<FormControl className="seedInput" name="seed" type="text" placeholder="What was the seed?"
				onChange={(e) => {
					inputValues[card.id] = e.target.value;
				}}/>
		</FormGroup>
	)
}

const timer = (card, type, config, time) => {
	if (type != "scheduled" || !config || !time) {
		return "";
	}
	let remains = Date.parse(card.lastShown) - new Date().getTime();
	switch (card.shownCount) {
		case 0:
			remains += config.reminders.first * 1000;
			break;
		case 1:
			remains += config.reminders.second * 1000;
			break;
	
		default:
			remains += config.reminders.recurrent * 1000;
			break;
	}
	remains = humanizeDuration(remains, {round: true, largest: 1});
	return (
		<h3><Label bsStyle="info">{remains}</Label></h3>
	)
}

const onClick = (card, type, action) => {
	if (type != "active" || card.shownCount < 2 ) {
		return action(card);
	}
	const cardID = inputValues[card.id];
	delete inputValues[card.id];
	return action(card, cardID);
}

const InfoCard = (props) => (
	<div>
		<Form horizontal className="white" onSubmit={(e) => e.preventDefault()}>
			<Col md={2} sm={0}>
			</Col>
			<Col md={8} sm={12}>
				<Panel className="panel-body">
					<Panel.Body>
						<Form horizontal className="seedInfo" onSubmit={(e) => e.preventDefault()}>
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
									<h3 className="head-seed">Your Seed</h3>
								</Col>
									<Col md={9}>
									<h3 className={style(props.card, props.type)}>
										<i>{props.card.seed}</i></h3>
									{timer(props.card, props.type, props.config, props.time)}
									{inputBox(props.card, props.type)}
								</Col>
								</FormGroup>
								<FormGroup className="FormGroup">
									<Col md={3}>
									<h3 className="head-soil">Your Soil</h3>
								</Col>
									<Col md={9}>
									<h3 className="remind-soil"><i>{props.card.soil}</i></h3>

								</Col>
								</FormGroup>
							</Col>
							<Col md={4} sm={12} className="some-image">
								<FormGroup>
								<Col md={12}>
									<div>
										<img src={image(props.card, props.type)} width={100} height={100} alt="flower" />
									</div>
								</Col>
								</FormGroup>
								<FormGroup>
								<Col md={12}>
									<div>
										{!title(props.card, props.type) ? "" : (
											<Button className="dismiss-btn" onClick={(e) => onClick(props.card, props.type, props.action)}>
												{title(props.card, props.type)}
											</Button>
										)}
									</div>
								</Col>
								</FormGroup>
							</Col>
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