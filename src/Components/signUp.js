import React, { useState } from 'react'
import { axiosInstance } from '../index';
import { Link, Redirect } from 'react-router-dom';

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
        <div>
            {goToLogin && <Redirect to='/' />}
            username
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
            <br />
            <br />
            <br />
            password
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
            <br />
            <br />
            <br />
            <button onClick={() => submit()} >sign up</button>
        </div>
    )
}

export default SignUp