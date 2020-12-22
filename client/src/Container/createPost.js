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
            console.log(title, content, props.userId, props.username)
            axiosInstance.post('posts/add', {
                title: title,
                content: content,
                userId: props.userId,
                username: props.username,
                token: props.token
            })
                .then(response => {
                    if (response.data.success) {
                        props.setAlert('Post Added!', 'success')
                    } else {
                        props.setAlert('Error Adding post...', 'error')
                    }
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
        username: state.auth.username,
        token: state.auth.token
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAlert: (message, style) => dispatch(actionCreators.setAlert(message, style))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
