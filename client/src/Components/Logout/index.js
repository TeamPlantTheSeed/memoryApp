import React from "react";
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';




class Logout extends React.Component {

    componentWillMount() {
        localStorage.removeItem('user_id');
        this.props.logout();
        this.context.unsubscribeFromNotifications();
    }    

    render = () => <Redirect to="/"/>
    
}
    
Logout.contextTypes = {
    unsubscribeFromNotifications: PropTypes.func,
};

export default Logout;