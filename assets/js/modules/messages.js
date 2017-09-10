import Immutable from 'immutable';
import Action from 'flux-standard-action';

//Action Types
export const SEND_MESSAGE = 'app/messages/SEND_MESSAGE';
export const RECEIVE_MESSAGE = 'app/messages/RECEIVE_MESSAGE';

//Reducers
export default (state = Immutable.List(), action = {}) => {
  switch (action.type) {
    case RECEIVE_MESSAGE:
      return state.push(action.payload);
    default:
      return state;
  }
};

//Actions
const Message = Immutable.Record({
  text: null,
  date: null,
  username: null
});

export function sendMessage(text, username, date = new Date()) {
  return new Action(SEND_MESSAGE, new Message({text, date, username}));
}

export function receiveMessage(text, username, date = new Date()) {
  return new Action(RECEIVE_MESSAGE, new Message({text, date, username}));
}

export function sendNotification(text, date) {
  return sendMessage(text, null, date);
}

export function receiveNotification(text, date) {
  return receiveMessage(text, null, date);
}
