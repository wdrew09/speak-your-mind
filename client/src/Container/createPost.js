import React, { useState } from 'react'
import { axiosInstance } from '../index';

import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';

import { Form, Button } from 'react-bootstrap';

const CreatePost = (props) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    //When user presses submit
    const submitPressed = (e) => {
        e.preventDefault()
        if (title.length > 0 && content.length > 0) {
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
                        setTitle('')
                        setContent('')
                    } else {
                        props.setAlert('Error Adding post...', 'error')
                    }
                });
        } else {
            props.setAlert('Must add title and content', 'error')
        }
    }


    return (
        <Form style={{width: '70%', marginLeft: '15%'}}>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows={8} value={content} onChange={(e) => setContent(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit" style={{ backgroundColor: '#3579f6', border: 'none' }} onClick={(e) => submitPressed(e)}>
                Submit
            </Button>
        </Form>
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
