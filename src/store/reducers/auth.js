import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_LOGIN:
            console.log('her77')
            return updateObject(state, {
                token: action.token
            })
        default:
            return state
    }
}

export default authReducer