import Immutable from 'immutable';
import {combineReducers} from 'redux-immutable';
import Action from 'flux-standard-action';

//Action Types
export const ADD_USER = 'app/users/ADD_USER';
export const REMOVE_USER = 'app/users/REMOVE_USER';
export const SET_USERNAME = 'app/users/SET_USERNAME';
export const SEND_USERNAME_UPDATE = 'app/users/SEND_USERNAME_UPDATE';

//Reducers
const currentUsername = (state = '', action = {}) => {
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
  return new Action(SEND_USERNAME_UPDATE, {newUsername, currentUsername});
}
export function setUsername(username) {
  return new Action(SET_USERNAME, username);
}
export function addUser(username) {
  return new Action(ADD_USER, username);
}
export function removeUser(username) {
  return new Action(REMOVE_USER, username);
}
