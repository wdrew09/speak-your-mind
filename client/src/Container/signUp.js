import React, { useState } from 'react'
import { axiosInstance } from '../index';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';

import { Form, Button } from 'react-bootstrap';

import './signUp.css'

const SignUp = (props) => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [goToLogin, setGoToLogin] = useState(false)

    //When user presses submit
    const submit = (e) => {
        e.preventDefault()
        if (username && password) {
            if (username.length < 4) {
                props.setAlert('Username must be at least 4 characters long!', 'error')
                return
            } else if (password.length < 7) {
                props.setAlert('Password must be at least 7 characters long!', 'error')
                return
            } else {
                axiosInstance.post('account/create', {
                    username: username,
                    password: password,
                }).then(response => {
                    if (response.data.success) {
                        setUsername('')
                        setPassword('')
                        props.setAlert('Account created! Please login', 'success')
                        setGoToLogin(true)
                    } else {
                        props.setAlert(response.data.message, 'error')
                    }
                });
            }
        }
    }

    return (
        <div className="Main">
            {goToLogin && <Redirect to='/' />}
            <div className="Leftside">
                Speak
                <br />
                Your
                <br />
                Mind
            </div>
            <div className="Rightside">
                <span className="MobileTitle">Speak Your Mind</span>
                <div className="LoginContainer">

                    <span className="Title">Create Account</span>
                    <Form style={{ marginTop: '10px' }}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{ backgroundColor: '#3579f6', border: 'none' }} onClick={(e) => submit(e)}>
                            Sign Up
                        </Button>
                        <Form.Text className="text-muted" style={{ marginTop: '2%' }}>
                            <a href="/" className="ForgetPwd">Sign In</a>
                        </Form.Text>
                    </Form>
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAlert: (message, style) => dispatch(actionCreators.setAlert(message, style))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);