import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { axiosInstance } from '../index';

import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import './login.css'

const Login = props => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [goToPosts, setGoToPosts] = useState(false)

    //If token can be verified then go to posts page
    useEffect(() => {
        axiosInstance.get('account/verify?token=' + props.token)
            .then(response => {
                if (response.data.success) {
                    console.log('go to post')
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

    // {/* login
    // username
    // <input type="text" onChange={(e) => setUsername(e.target.value)} />
    // <br />
    // <br />
    // <br />
    // password
    // <input type="password" onChange={(e) => setPassword(e.target.value)} />
    // <br />
    // <br />
    // <br />
    // <button onClick={() => submit()} >login</button> */}
    // {/* <div class="left-side">
    //     SPEAK
    //     <br />
    //     YOUR
    //     <br />
    //     MIND
    // </div> */}

    return (
        <div class="main">
            <div class="left-side">
                Speak
                <br />
                Your
                <br />
                Mind
            </div>
            <div class="right-side">
                {goToPosts && <Redirect to='/posts' />}
                <div class="col-md-6 login-form-1">
                    <h3>Sign In</h3>
                    <form>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Username" value="" />
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" placeholder="Password" value="" />
                        </div>
                        <div class="form-group">
                            <input type="submit" class="btnSubmit" value="Login" />
                        </div>
                        <div class="form-group">
                            <a href="#" class="ForgetPwd">Sign Up</a>
                        </div>
                    </form>
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
