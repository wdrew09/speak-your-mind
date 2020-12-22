import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button, Nav, Navbar, Form } from 'react-bootstrap';

const Navigationbar = (props) => {
    //when user logs out redirect to login page
    const [goToLogin, setGoToLogin] = useState(false)

    //Checking for when the toast message changes, displays it if so
    useEffect(() => {
        if (props.style == 'success') {
            toast.success(props.message)
        } else if (props.style == 'error') {
            toast.error(props.message)
        } else if (props.style == 'info') {
            toast.info(props.message)
        }
    }, [props.message])

    //logout pressed
    const onLogout = () => {
        props.logout()
        setGoToLogin(true)
    }

    return (
        <Navbar bg="primary" expand="lg">
            {goToLogin && <Redirect to='/' />}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Navbar.Brand href="/posts" className="text-light" size="lg">Speak-Your-Mind</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/account" className="text-light">My Account</Nav.Link>
                    <Nav.Link href="/posts" className="text-light">Posts</Nav.Link>
                    <Nav.Link href="/create-post" className="text-light">Create Post +</Nav.Link>
                </Nav>
                <Form inline>
                    <Button className="text-primary" variant="light" onClick={() => onLogout()}>Logout</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    message: state.alert.message,
    style: state.alert.style
});

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(actionCreators.logout()),
        setAlert: (message, style) => dispatch(actionCreators.setAlert(message, style))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigationbar);