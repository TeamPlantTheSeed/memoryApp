import React from "react";
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import './userLogon.scss';
import Modal from 'react-bootstrap/lib/Modal'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Form from 'react-bootstrap/lib/Form';
import PlantASeedButton from '../PlantASeedButton'
import Home from '../../Views/Home';



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

    state = {
        redirectToReferrer: false,
        redirectTo: '/',
        respectOriginalReferrer: true,
    };

    handleHide = (redirectTo, respectOriginalReferrer) => {
        this.setState({
            redirectToReferrer: true,
            redirectTo,
            respectOriginalReferrer,
        })
    }

    render() {
        const { from } = (this.state.respectOriginalReferrer &&
                          this.props.location.state ||
                          {from: this.state.redirectTo});
        return this.state.redirectToReferrer ? (
            <Redirect to={from}/>
        ) : (
            <div>
                <Home/>
            <div className="modal-container" style={{ height: 100 }}>
                <Modal
                    show={true}
                    onHide={() => this.handleHide('/', false)}
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
                                this.handleHide('/new', true);
                                // TODO: this have to be invoked when 
                                // the user actually logs in
                                this.props.login();
                                this.context.subscribeForNotifications(1);
                                this.context.updateCards(1);
                            }}
                        >Let's GO!</Button>

                    </Modal.Footer>
                </Modal>
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