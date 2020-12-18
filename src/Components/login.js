import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { axiosInstance } from '../index';

import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';

const Login = props => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [goToPosts, setGoToPosts] = useState(false)

    //If token can be verified then go to posts page
    useEffect(() => {
        axiosInstance.get('account/verify?token=' + props.token)
            .then(response => {
                if (response.data.success) {
                    setGoToPosts(true)
                } else {
                    console.log('error verifying account')
                }
            });
    }, [props.token])


    const submit = () => {
        if (username && password) {
            props.login(username, password)
        }
    }

    return (
        <div>
            {goToPosts && <Redirect to='/posts' />}
            login
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
            <button onClick={() => submit()} >login</button>
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
