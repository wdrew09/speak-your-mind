import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    message: '',
    style: ''
}

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ALERT:
            return updateObject(state, {
                message: action.message,
                style: action.style
            })
        default:
            return state
    }
}

export default alertReducer