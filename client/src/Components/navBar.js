import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';

import { Button, Nav, Navbar, Form } from 'react-bootstrap';

const Navigationbar = (props) => {
    //when user logs out redirect to login page
    const [goToLogin, setGoToLogin] = useState(false)

    //logout pressed
    const onLogout = () => {
        props.logout()
        setGoToLogin(true)
    }

    return (
        <Navbar bg="primary" expand="lg">
            {goToLogin && <Redirect to='/' />}
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

});

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(actionCreators.logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigationbar);