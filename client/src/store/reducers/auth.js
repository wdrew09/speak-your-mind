import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: '',
    userId: '',
    username: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_LOGIN:
            console.log(action.userId)
            return updateObject(state, {
                token: action.token,
                userId: action.userId,
                username: action.username
            })
        case actionTypes.LOGOUT:
            return updateObject(state, {
                token: action.token,
                userId: '',
                username: ''
            })
        default:
            return state
    }
}

export default authReducer