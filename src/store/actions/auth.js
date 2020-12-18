import * as actionTypes from './actionTypes';
import { axiosInstance } from '../../index';

import {
    setInStorage,
    getFromStorage
} from '../../utils/storage'

export const login = (username, password) => {
    return dispatch => {
        axiosInstance.post('account/login', {
            username: username,
            password: password,
        }).then(response => {
            console.log(response)
            if (response.data.success) {
                setInStorage('speak_your_mind', { token: response.data.token })
                let token = response.data.token;
                let userId = response.data.userId
                dispatch(setLogin(token, userId, username))
            } else {

            }
        });
    };
}

export const setLogin = (token, userId, username) => {
    console.log(token, userId)
    return {
        type: actionTypes.SET_LOGIN,
        token: token,
        userId: userId,
        username: username
    };
}

export const logout = () => {
    return dispatch => {
        let obj = getFromStorage('speak_your_mind')

        if (obj && obj.token) {
            let token = obj.token
            axiosInstance.get('account/logout?token=' + token)
                .then(response => {
                    if (response.data.success) {
                        localStorage.removeItem('speak_your_mind')
                        dispatch(setLogout())
                    } else {
                        console.log('error')
                    }
                })
        } else {
            console.log('No token found')
        }
    }
}

export const setLogout = () => {
    return {
        type: actionTypes.LOGOUT,
        token: '',
    };
}