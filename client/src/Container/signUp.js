import React, { useState } from 'react'
import { axiosInstance } from '../index';
import { Link, Redirect } from 'react-router-dom';

import { Form, Button, InputGroup } from 'react-bootstrap';

import './signUp.css'

const SignUp = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [goToLogin, setGoToLogin] = useState(false)

    const submit = () => {
        if (username && password && username.length > 3 && password.length > 6) {
            axiosInstance.post('account/create', {
                username: username,
                password: password,
            }).then(response => {
                if (response.data.success) {
                    setUsername('')
                    setPassword('')
                    setGoToLogin(true)
                } else {
                    console.log('error creating account')
                }
            });
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
                <div className="LoginContainer">
                    <span className="Title">Create Account</span>
                    <Form style={{marginTop: '10px'}}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{ backgroundColor: '#3579f6', border: 'none' }} onClick={(e) => submit(e)}>
                            Sign Up
                        </Button>
                        <Form.Text className="text-muted" style={{ marginTop: '2%'}}>
                        <a href="/" className="ForgetPwd">Sign In</a>
                        </Form.Text>
                    </Form>
                </div>

            </div>
        </div>
    )
}

export default SignUp