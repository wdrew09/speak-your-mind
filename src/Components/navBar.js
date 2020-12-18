import React, { Component, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';

const Navbar = (props) => {
    const [goToLogin, setGoToLogin] = useState(false)

    const onLogout = () => {
        props.logout()
        if (props.token.length === 0) {
            setGoToLogin(true)
        } else {
            console.log('logout error')
        }
    }

    console.log('token length: ' + props.token.length)
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            {goToLogin && <Redirect to='/' />}
            <Link to="/" className="navbar-brand">a</Link>
            <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/account" className="nav-link">account</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/posts" className="nav-link">posts</Link>
                    </li>
                    <li className="navbar-item">
                        <button style={{ height: '50px', width: '100px', color: 'blue' }} onClick={() => onLogout()}>Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    );

}

const mapStateToProps = (state) => ({
    token: state.auth.token
});


const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(actionCreators.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);