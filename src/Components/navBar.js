import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import { axiosInstance } from '../index';

const Navbar = (props) => {
    const [goToLogin, setGoToLogin] = useState(false)
    const [authorized, setAuthorized] = useState()


    useEffect(() => {
        if (props.token) {
            axiosInstance.get('account/verify?token=' + props.token)
                .then(response => {
                    if (response.data.success) {
                        setAuthorized(true)
                    } else {
                        console.log('not authorized')
                        setAuthorized(false)
                    }
                });
        } else {
            console.log('not authorized')
            setAuthorized(false)
        }
    }, [props.token])

    const onLogout = () => {
        props.logout()
        if (props.token.length === 0) {
            setGoToLogin(true)
        } else {
            console.log('logout error')
        }
    }

    console.log('token length: ' + props.token.length)
    if (authorized === true) {
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
                            <Link to="/create-post" className="nav-link">create post</Link>
                        </li>
                        <li className="navbar-item">
                            <button style={{ height: '50px', width: '100px', color: 'blue' }} onClick={() => onLogout()}>Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>

        );
    } else {
        return (<div/>)
    }

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