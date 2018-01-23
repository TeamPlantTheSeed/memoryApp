import React from "react";
import { NavLink } from 'react-router-dom';
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
				<NavLink to="/">
					<img alt="leaflogo" src={LeafLogo} width="75" height="50" />
				</NavLink>
				</NavItem>
			</Navbar.Brand>
		</Navbar.Header>

		{!props.isLoggedIn ? (
            <Nav pullRight >
                {/* TODO: map() over props.children */}
                <NavItem eventKey={1} href="#">             
                    <UserLogon login={() => props.changeLoggedIn(true)}/> 
                </NavItem>
            
            </Nav>


		) : (
				<Nav pullRight>
					<NavItem eventKey={1} href="#">
						<NavLink to="/review" 
							className="btn btn-large btn-other" 
							activeClassName="btn-other-active">
							YOUR SEEDS
						</NavLink>
					</NavItem>
					<NavItem eventKey={1} href="#">
						<NavLink to="/new" 
							className="btn btn-large btn-other" 
							activeClassName="btn-other-active">
							NEW SEED
						</NavLink>						
					</NavItem>
					<NavItem eventKey={1} href="#">
						<NavLink to="/scheduled" 
							className="btn btn-large btn-other" 
							activeClassName="btn-other-active">
							REMINDERS
						</NavLink>						
					</NavItem>
					<NavItem eventKey={1} href="#">
						<NavLink to="/archive" 
							className="btn btn-large btn-other" 
							activeClassName="btn-other-active">
							ARCHIVE
						</NavLink>						
					</NavItem>
					<NavItem eventKey={2} href="#">
						<NavLink to="/logout"
							className="btn btn-large btn-sign-in"
							activeClassName="btn btn-large link-active">
							LOG OUT
						</NavLink>						
					</NavItem>
				</Nav>
			)}
	</Navbar>
);

export default MyNavbar;
