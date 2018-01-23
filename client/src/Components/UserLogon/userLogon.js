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
import axios from "axios";
import Home from '../../Views/Home';



const userLogon = (
    <form>
        <FormGroup bsSize="large">
            <FormControl className="userName" name="userName" type="text" placeholder="User Name" />
            {/* <FormControl
              type="text"
              value={this.state.username}
              placeholder="Enter user name"
              onChange={this.handleInputChange}
            /> */}
        </FormGroup>
        <FormGroup bsSize="large">
            <FormControl className="userPass" name="userPass" type="password" placeholder="Password" />
        </FormGroup>
    </form>
);

class UserLogon extends React.Component {

    state = {
        redirectToReferrer: false,
        redirectTo: '/',
        respectOriginalReferrer: true,
        username: '',
        userpass: '' 
    };
        
    handleHide = (redirectTo, respectOriginalReferrer) => {
        this.setState({
            redirectToReferrer: true,
            redirectTo,
            respectOriginalReferrer,
        })
    }

    handleInputChange = event => {    
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleFormSubmit = event => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        // event.preventDefault();
        // if (!this.state.username) {
        //   alert("Enter your username please!");
        // }
        // alert(`Your username and password ${this.state.username} ${this.state.userpass}`);
        axios.post("/api/users/", {
            username: this.state.username,
            userpass: this.state.userpass
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);            
        }).then(() => {
            this.props.login();
            this.handleHide('/new', true);
            this.context.subscribeForNotifications(1);
            this.context.updateCards(1);
        });
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
                            onClick={this.handleFormSubmit}
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