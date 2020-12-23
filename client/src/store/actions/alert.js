import * as actionTypes from './actionTypes';

//Setting the alert message and type of alert
export const setAlert = (message, style) => {
    return {
        type: actionTypes.SET_ALERT,
        message: message,
        style: style
    };
}

export default setAlert