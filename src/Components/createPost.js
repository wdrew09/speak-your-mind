import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { axiosInstance } from '../index';

import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';

const CreatePost = (props) => {
    const [title, setTitle] = useState()
    const [content, setContent] = useState()

    const submitPressed = () => {
        if (title && content) {
            axiosInstance.post('posts/add', {
                title: title,
                content: content,
                userId: props.userId,
                username: props.username
            })
                .then(response => {
                    console.log(response)
                    // if (response.data.success) {
                    //     console.log(success)
                    // } else {
                    //     console.log('not authorized')
                    //     setAuthorized(false)
                    // }
                });
        }
    }


    return (
        <div>
            <input placeholder={"Title"} onChange={(e) => setTitle(e.target.value)} />
            <input placeholder={"Content"} onChange={(e) => setContent(e.target.value)} />
            <button onClick={() => submitPressed()}>Submit</button>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        username: state.auth.username
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // login: (username, password) => dispatch(actionCreators.login(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
