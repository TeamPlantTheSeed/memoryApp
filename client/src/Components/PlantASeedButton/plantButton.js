import React from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import Modal from 'react-bootstrap/lib/Modal'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Form from 'react-bootstrap/lib/Form';
import './plantButton.scss';

class PlantButton extends React.Component {
    constructor(props, ...args) {
        super(props, ...args);

        this.state = { 
            show: true,
            seed: props.seed || '',
            soil: props.soil || '',
        };
    }

    closeModal = () => {
        this.setState({ show: false });
    }

    handleInputChange = event => {    
        this.setState({
            [event.target.name]: event.target.value
        })
        
    };

    handleFormSubmit = event => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        // event.preventDefault();
        if (!this.state.seed) {
          alert("Enter the seed please!");
          return;
        }
        this.props.action({
            seed: this.state.seed,
            soil: this.state.soil
        })
        this.setState({
            seed: '',
            soil: '',
        })
        if (this.props.card) {
            this.closeModal()
        }
    };
    
    render() {
        return (!this.props.card && !this.state.show) ? (
            <Redirect to='/review'/>
        ) : (
            <div className="modal-container" style={{ height: 100 }}>
                {/* <Button
                    bsStyle="warning"
                    bsSize="large"
                    className="hide"
                    onClick={() => this.setState({ show: true })}
                >
                    PLANT A SEED!
                </Button> */}

                <Modal
                    show={this.state.show}
                    onHide={this.closeModal}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            <h1>Let's Plant a Seed!</h1>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3>Simply enter a bit of reference info
                        (the Soil) and the thing you want to
                        remember (the Seed)…
                        Then watch it grow.</h3>
                    {/* {formInstance} */}
    <form>
        <FormGroup bsSize="large" >
            <FormControl
              name = "seed"
              type="text"
              value={this.state.seed}
              placeholder="ex: Name, number, etc. Make it short and understandable, you will be tested on this."
              onChange={this.handleInputChange}
            />
        </FormGroup>
        <FormGroup bsSize="large">
            <FormControl
              name = "soil"
              type="text"
              value={this.state.soil}
              placeholder="ex: Where you met, what purpose, which language, etc..."
              onChange={this.handleInputChange}
            />
        </FormGroup>
    </form>

                    </Modal.Body>
                    <Modal.Footer >
                        <Button
                        className="plant-btn"
                        bsStyle="warning"
                        bsSize="large"
                        onClick={this.handleFormSubmit}>Plant it!</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}


export default PlantButton;