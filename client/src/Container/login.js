import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { axiosInstance } from '../index';

import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import './signUp.css';

import { Form, Button } from 'react-bootstrap';

const Login = props => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [goToPosts, setGoToPosts] = useState(false)

    //If token can be verified then go to posts page
    useEffect(() => {
        axiosInstance.get('account/verify?token=' + props.token)
            .then(response => {
                if (response.data.success) {
                    setGoToPosts(true)
                } else {
                    //Not verified
                }
            });
    }, [props.token])


    //When user presses submit
    const submit = (e) => {
        e.preventDefault();
        if (username && password) {
            props.login(username, password)
        }
    }

    return (
        <div className="Main">
            {goToPosts && <Redirect to='/posts' />}
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
                    <span className="Title">Login</span>
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
                            Sign In
                        </Button>
                        <Form.Text className="text-muted" style={{ marginTop: '2%' }}>
                            <a href="/sign-up" className="ForgetPwd">Sign Up</a>
                        </Form.Text>
                    </Form>
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => dispatch(actionCreators.login(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
