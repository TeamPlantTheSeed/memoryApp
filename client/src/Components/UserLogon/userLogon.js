import React from "react";
import './userLogon.scss';
import Modal from 'react-bootstrap/lib/Modal'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Form from 'react-bootstrap/lib/Form';
import PlantASeedButton from '../PlantASeedButton'



const userLogon = (
    <form>
        <FormGroup bsSize="large">
            <FormControl className="userName" name="name" type="text" placeholder="User Name" />
        </FormGroup>
        <FormGroup bsSize="large">
            <FormControl className="userPass" name="password" type="password" placeholder="Password" />
        </FormGroup>
    </form>
);


class UserLogon extends React.Component {
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
            <div className="modal-container" style={{ height: 100 }}>
                {/* TODO: onClick() should push "/login"
                    to Router history instead */}
                <Button
                    className="get-started"
                    bsStyle="warning"
                    bsSize="large"
                    onClick={() => this.setState({ show: true })}
                >
                    Let's Get Started!
                </Button>

            {/* TODO: Extract this modal as separate LoginForm component,
            set state.show to always be true, exclude from UserLogon 
            (visibility to be controlled by Router) */}
                <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            <h1>Are you ready to start planting!</h1>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3>Simply create an account by entering a user name and password. That's it!
                            ...or Sign in using your existing account info.
                            Have fun!</h3>
                        {userLogon}
                    </Modal.Body>
                    <Modal.Footer >
                        {/* <Button class="plant-btn" onClick={this.handleHide}>Start Planting!</Button> */}
                        
                        <Button 
                        className="signin-btn" 
                        bsStyle="warning"
                        bsSize="large"
                        onClick={this.handleHide }>Let's GO!</Button>
                        
                    </Modal.Footer>
                    <PlantASeedButton />
                </Modal>
            </div>
        );
    }
}


export default UserLogon;