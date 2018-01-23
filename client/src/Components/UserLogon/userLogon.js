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


class UserLogon extends React.Component {

    constructor(props, ...args) {
        super(props, ...args);
        this.state = {
            redirectToReferrer: false,
            redirectTo: '/',
            respectOriginalReferrer: true,
            username: '',
            userpass: '' 
        };
    }

    componentWillMount() {
        const userID = localStorage.getItem('user_id');
        if (userID) {
            this.login(userID);
        }
    }

    login = (userID) => {
        this.props.login();
        this.handleHide('/new', true);
        this.context.subscribeForNotifications(userID);
        this.context.updateCards(userID);
    }

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
        if (!this.state.username || !this.state.userpass) {
          alert("Enter your username & password please!");
          return;
        }
        // alert(`Your username and password ${this.state.username} ${this.state.userpass}`);
        axios.post("/api/users/", {
            username: this.state.username,
            userpass: this.state.userpass
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);            
        }).then(() => {
            const USER_ID = 1;
            this.login(USER_ID);
            localStorage.setItem('user_id', USER_ID);
        });
    }

    userLogonForm = () => (
        <form>
            <FormGroup bsSize="large">
                <FormControl className="userName" name="username" type="text" placeholder="User Name" onChange={this.handleInputChange}/>
            </FormGroup>
            <FormGroup bsSize="large">
                <FormControl className="userPass" name="userpass" type="password" placeholder="Password" onChange={this.handleInputChange}/>
            </FormGroup>
        </form>
    );
    
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
                        {this.userLogonForm()}
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