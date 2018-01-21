import React from "react";
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import NavItem from 'react-bootstrap/lib/NavItem';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import MainButtons from '../Button'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import './Navbar.css';
import LeafLogo from './images/leaf2.png'
import UserLogon from '../UserLogon'

// const signUpButton = UserLogon;
const MyNavbar = (props) => (

	<Navbar className="header">
		<Navbar.Header  >
			<Navbar.Brand  >
				<NavItem>
					<img alt="leaflogo" src={LeafLogo} width="75" height="50">
					</img>
				</NavItem>
			</Navbar.Brand>
		</Navbar.Header>

		{!props.isLoggedIn ? (
            <Nav pullRight >
                
                <NavItem eventKey={1} href="#">             
                        <UserLogon />               
                </NavItem>
            
            </Nav>


		) : (
				<Nav pullRight>
					<NavItem eventKey={1} href="#">
						<button className="btn btn-large btn-sign-up " >CREATE NEW SEED</button>
					</NavItem>
					<NavItem eventKey={2} href="#">
						<button className="btn btn-large btn-sign-in" >LOG OUT</button>
					</NavItem>
				</Nav>
			)}
	</Navbar>
);

export default MyNavbar;
