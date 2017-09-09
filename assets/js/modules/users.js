import Immutable from 'immutable';
import {combineReducers} from 'redux-immutable';

//Action Types
export const ADD_USER = 'app/users/ADD_USER';
export const REMOVE_USER = 'app/users/REMOVE_USER';
export const SET_USERNAME = 'app/users/SET_USERNAME';
export const SEND_USERNAME_UPDATE = 'app/users/SEND_USERNAME_UPDATE';

//Reducers
const currentUsername = (state = null, action = {}) => {
    switch (action.type) {
        case SET_USERNAME:
            return action.payload;
        default:
            return state;
    }
};
const joinedUsers = (state = Immutable.List(), action = {}) => {
    switch (action.type) {
        case ADD_USER:
            return state.push(action.payload);
        case REMOVE_USER: {
            const i = state.indexOf(action.payload);
            return i !== -1 ? state.splice(i, 1) : state;
        }
        default:
            return state;
    }
};

export default combineReducers(
    {
        currentUsername,
        joinedUsers
    },
    Immutable.Record({
        currentUsername: undefined,
        joinedUsers: undefined
    })
);

//Actions
export function sendUsernameUpdate(newUsername, currentUsername) {
    return {
        type: SEND_USERNAME_UPDATE,
        payload: {newUsername, currentUsername}
    };
}
export function setUsername(username) {
    return {
        type: SET_USERNAME,
        payload: username
    };
}
export function addUser(username) {
    return {
        type: ADD_USER,
        payload: username
    };
}
export function removeUser(username) {
    return {
        type: REMOVE_USER,
        payload: username
    };
}
