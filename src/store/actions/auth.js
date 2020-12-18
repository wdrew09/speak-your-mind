import * as actionTypes from './actionTypes';
import { axiosInstance } from '../../index';

import {
    setInStorage
} from '../../utils/storage'

export const login = (username, password) => {
    return dispatch => {
        console.log('here 2')
        axiosInstance.post('account/login', {
            username: username,
            password: password,
        }).then(response => {
            console.log(response)
            if (response.data.success) {
                setInStorage('speak_your_mind', { token: response.data.token })
                let token = response.token;
                setLogin(token);
                // dispatch(setAuth(token));
            } else {

            }

        });
    };
}

export const setLogin = token => {
    return {
        type: actionTypes.SET_LOGIN,
        token: token,
    };
}

// export const getToken = () => {
//     return (dispatch, getState) => {
//         let token = getState().auth.token;

//         axiosInstance.get(`user/`, {
//             // headers: {Authorization: token},            
//         }).then(response => {
//             dispatch(setMyTeamList(response.data));
//         })
//     };
// }