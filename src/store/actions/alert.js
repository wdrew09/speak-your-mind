import * as actionTypes from './actionTypes';

// export const alert = (message, type) => {
//     return dispatch => {
//         axiosInstance.post('account/login', {
//             username: username,
//             password: password,
//         }).then(response => {
//             console.log(response)
//             if (response.data.success) {
//                 setInStorage('speak_your_mind', { token: response.data.token })
//                 let token = response.data.token;
//                 let userId = response.data.userId
//                 dispatch(setLogin(token, userId, username))
//             } else {

//             }
//         });
//     };
// }

export const setAlert = (message, style) => {
    console.log(message, style)
    return {
        type: actionTypes.SET_ALERT,
        message: message,
        style: style
    };
}