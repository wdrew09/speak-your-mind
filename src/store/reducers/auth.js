import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: '',
    userId: ''
}

const authReducer = (state = initialState, action) => {
    console.log('auth reducer')
    switch (action.type) {
        case actionTypes.SET_LOGIN:
            console.log(action.userId)
            return updateObject(state, {
                token: action.token,
                userId: action.userId
            })
        case actionTypes.LOGOUT:
            return updateObject(state, {
                token: action.token,
                userId: ''
            })
        default:
            return state
    }
}

export default authReducer