import React, { useState } from 'react'

import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import { login } from '../store/actions/index';



const Login = props => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const submit = () => {
        if (username && password) {
            // fetch('http://localhost:5000/api/account/login', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         username: username,
            //         password: password
            //     })
            // })
            //     .then(res => res.json())
            //     .then(json => {
            //         if (json.success) {
            //             setInStorage('speak_your_mind', { token: json.token })
            //             setUsername('')
            //             setPassword('')
            //         } else {
            //             console.log('failure')
            //         }
            //     })
            console.log('here 1')
            props.login(username, password)
        }
    }


    return (
        <div>
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
        // error: state.auth.error,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => dispatch(actionCreators.login(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
