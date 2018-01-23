import React from "react";
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import NavItem from 'react-bootstrap/lib/NavItem';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import MainButtons from '../Button'
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import './Navbar.css';
import LeafLogo from './images/leaf2.png'

const MyNavbar = (props) => (

	<Navbar className="header">
		<Navbar.Header  >
			<Navbar.Brand  >
				<NavItem>
					<img alt="leaflogo" src={LeafLogo} width="75" height="50" />
				</NavItem>
			</Navbar.Brand>
		</Navbar.Header>

		{!props.isLoggedIn ? (
            <Nav pullRight >
                {/* TODO: map() over props.children */}
                <NavItem eventKey={1} href="#">   
                    <NavLink to="/login">
                        <Button className="get-started"
                                bsStyle="warning"
                                bsSize="large">
                            Let's Get Started!
                        </Button>        
                    </NavLink>  
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
