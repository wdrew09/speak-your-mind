import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import { Redirect } from 'react-router-dom';
import { axiosInstance } from '../index';

import { Modal, Button, Form } from 'react-bootstrap';

import './myInfo.css';

const MyInfo = props => {
    const [user, setUser] = useState()
    const [deletePressed, setDeletePressed] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [goToLogin, setGoToLogin] = useState(false)

    //When user hits first delete button, pulls up modal
    const handleClose = () => setDeletePressed(false);
    const handleShow = () => setDeletePressed(true);

    useEffect(() => {
        axiosInstance.post('account/info', {
            userId: props.userId
        })
            .then(response => {
                if (response.data.success) {
                    setUser(response.data.user)
                } else {
                    props.setAlert('Error retrieving user data...', 'error')
                }
            })
    }, [])

    //If given proper username and password, deletes account
    const deleteAccount = () => {
        axiosInstance.post('account/delete', {
            username: username,
            password: password,
        })
            .then(response => {
                if (response.data.success) {
                    props.logout()
                    setGoToLogin(true)
                    props.setAlert(response.data.message, 'info')
                } else {
                    props.setAlert(response.data.message, 'error')
                }
            });
        handleClose()
    }


    return (
        <div className="PostView">
            {goToLogin && <Redirect to='/' />}
            {user &&
                <div>
                    <br />
                    <span>
                        Username: {user.username}
                    </span>
                    <br />
                    <Button variant="danger" type="submit" onClick={handleShow} style={{ marginTop: '20px' }}>
                        Delete Account
                    </Button>
                </div>
            }
            <Modal show={deletePressed} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete you account?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => deleteAccount()}>
                        Delete Account
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAlert: (message, style) => dispatch(actionCreators.setAlert(message, style)),
        logout: () => dispatch(actionCreators.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyInfo);