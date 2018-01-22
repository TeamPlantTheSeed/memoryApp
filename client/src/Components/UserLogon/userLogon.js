import React from "react";
import PropTypes from 'prop-types';
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
            <FormControl className="userName" name="name" type="email" required placeholder="User Email" />
        </FormGroup>
        <FormGroup bsSize="large">
            <FormControl className="userPass" name="password" type="password" placeholder="Password" />
        </FormGroup>
    </form>
);


class UserLogon extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);

        this.handleHide = this.handleHide.bind(this);

        this.state = { show: false };

    }

    handleHide() {
        this.setState({ show: false, show_button: false });
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
                            Are you ready to start planting!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3 id="userModBody">Simply create an account by entering your email and password. That's it!
                            ...or Sign in using your existing account info.
                            Have fun!</h3>
                        {userLogon}
                    </Modal.Body>
                    <Modal.Footer >

                        <Button
                            bsStyle="warning"
                            bsSize="large"
                            onClick={(e) => {
                                this.handleHide();
                                // TODO: this have to be invoked when 
                                // the user actually logs in
                                this.props.login();
                                this.context.subscribeForNotifications(1);
                                this.context.updateCards(1);
                            }}
                        >Let's GO!</Button>

                    </Modal.Footer>
                </Modal>
                <div className= {this.state.show_button ? "" : "hide"}>
                    <PlantASeedButton show={this.state.show_button} />
                </div>
            </div>
        );
    }
}

UserLogon.contextTypes = {
    subscribeForNotifications: PropTypes.func,
    updateCards: PropTypes.func,
};

export default UserLogon;