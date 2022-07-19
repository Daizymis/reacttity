import { combineReducers } from 'redux'
import defaultState from './state';

export function login(state = defaultState.user, action) {
    switch(action.type) {
        case 'SET_USER_INFO': return action.data
        default: return state || {};
    }
}
export function login2(state = defaultState.user, action) {
    switch(action.type) {
        case 'SET_USER_INFO': return action.data
        default: return state || {};
    }
}

export default combineReducers({
    login,login2
})