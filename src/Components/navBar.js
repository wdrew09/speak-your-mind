import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import { axiosInstance } from '../index';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Navbar = (props) => {
    const [goToLogin, setGoToLogin] = useState(false)
    const [authorized, setAuthorized] = useState()


    useEffect(() => {
        if (props.token) {
            axiosInstance.get('account/verify?token=' + props.token)
                .then(response => {
                    if (response.data.success) {
                        setAuthorized(true)
                        // props.setAlert('logged in', 'success')
                    } else {
                        setAuthorized(false)
                    }
                });
        } else {
            setAuthorized(false)
        }
    }, [props.token])

    useEffect(() => {
        if (props.style == 'success') {
            toast.success(props.message)
        } else if (props.style == 'error') {
            toast.error(props.message)
        } else if (props.style == 'info') {
            toast.info(props.message)
        }
    }, [props.message])

    const onLogout = () => {
        props.logout()
        if (props.token.length === 0) {
            setGoToLogin(true)
        } else {
            console.log('logout error')
        }
    }


    // const notify = (message, style) => {
    //     if (style == 'success') {
    //         return toast.success(message)
    //     } else if (style == 'error') {
    //         return toast.error(message)
    //     } else if (style == 'info') {
    //         return toast.info(message)
    //     }
    // }

    if (authorized === true) {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                {goToLogin && <Redirect to='/' />}
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Link to="/" className="navbar-brand">a</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/account" className="nav-link">account</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/posts" className="nav-link">posts</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create-post" className="nav-link">create post</Link>
                        </li>
                        <li className="navbar-item">
                            <button style={{ height: '50px', width: '100px', color: 'blue' }} onClick={() => onLogout()}>Logout</button>
                        </li>
                        {/* <li className="navbar-item">
                            <button style={{ height: '50px', width: '100px', color: 'blue' }} onClick={() => notify()}>notify</button>
                        </li> */}
                    </ul>
                </div>
            </nav>

        );
    } else {
        return (<div />)
    }

}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    message: state.alert.message,
    style: state.alert.style
});


const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(actionCreators.logout()),
        setAlert: (message, style) => dispatch(actionCreators.setAlert(message, style))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);