import React from "react";
import './cardModal.scss';
import Modal from 'react-bootstrap/lib/Modal'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Form from 'react-bootstrap/lib/Form';
import infoCard from '../InfoCards';

const userInfoCard = infoCard;
/**
 * You will want to include this bit of css
 *
 * .modal-container {
 *   position: relative;
 * }
 * .modal-container .modal, .modal-container .modal-backdrop {
 *   position: absolute;
 * }
 */

class CardModal extends React.Component {
    constructor(...args) {
        super(...args);

        this.handleHide = this.handleHide.bind(this);

        this.state = { show: false };
    }

    handleHide() {
        this.setState({ show: false });
    }
    render() {
        return (
            <div className="modal-container" style={{ height: 200 }}>
                <Button
                    bsStyle="warning"
                    bsSize="large"
                    onClick={() => this.setState({ show: true })}
                >Button for Data/Image
				</Button>

                <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            Remember this?
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            {userInfoCard}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="warning" type="submit" onClick={this.handleHide}>Thanks for the Reminder!</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default CardModal;

