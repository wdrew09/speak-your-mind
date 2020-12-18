import React, { Component, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import {
    getFromStorage,
    setInStorage
} from '../utils/storage'

const Navbar = () => {
    const [goToLogin, setGoToLogin] = useState(false)

    const onLogout = () => {
        let obj = getFromStorage('speak_your_mind')

        if (obj && obj.token) {
            let token = obj.token

            fetch('http://localhost:5000/api/account/logout?token=' + token, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        localStorage.clear()
                        setGoToLogin(true)
                    } else {
                        console.log('Error loggin out')
                    }
                })
        } else {
            console.log('No token found')
        }
    }

    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            {goToLogin && <Redirect to='/' />}
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
                        <button style={{height:'50px', width: '100px', color: 'blue'}} onClick={() => onLogout()}>Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    );

}

export default Navbar