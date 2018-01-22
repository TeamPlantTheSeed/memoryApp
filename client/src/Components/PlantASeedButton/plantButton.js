import React from "react";
import './plantButton.scss';
import Modal from 'react-bootstrap/lib/Modal'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Form from 'react-bootstrap/lib/Form';
import axios from "axios";

class PlantButton extends React.Component {
    constructor(...args) {
        super(...args);
        
        this.handleHide = this.handleHide.bind(this);

        this.state = { 
            show: false,
            seed: '',
            soil: ''
        };
    }

    handleHide() {
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
        }
        alert(`Your seed and soil ${this.state.seed} ${this.state.soil}`);
        axios.post("api/card/1",{
            seed: this.state.seed,
            soil: this.state.soil
        }).then((response, error) => 
        console.log(response, error)
        )
    };
    
    render() {
    
        return (
            <div className="modal-container" style={{ height: 100 }}>
                <Button
                    bsStyle="warning"
                    bsSize="large"
                    onClick={() => this.setState({ show: true })}
                >
                    PLANT A SEED!
                </Button>

                <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
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
                        class="plant-btn"
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