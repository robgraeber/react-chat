import {Socket} from 'phoenix';
import {
  receiveMessage,
  receiveNotification,
  SEND_MESSAGE
} from '../modules/messages';
import {
  addUser,
  removeUser,
  SET_USERNAME,
  SEND_USERNAME_UPDATE
} from '../modules/users';

//Event types
const CHAT_MESSAGE = 'chat:message';
const USER_LIST = 'user:list';
const USER_CHANGED = 'user:changed';
const USER_JOINED = 'user:joined';
const USER_QUIT = 'user:quit';

let isInitialized = false;
let channel;

function init(initialUsername, dispatch) {
  if (isInitialized) {
    return;
  }
  isInitialized = true;

  const socket = new Socket('/socket', {
    logger: (kind, msg, data) => {
      console.log(`${kind}: ${msg}`, data);
    }
  });

  socket.connect();

  channel = socket.channel('chat_room:lobby', {
    username: initialUsername
  });

  channel.join();

  channel.on(USER_LIST, usersObj => {
    Object.keys(usersObj).forEach(username => {
      dispatch(addUser(username));
    });
  });

  channel.on(USER_CHANGED, ({currentUsername, newUsername}) => {
    dispatch(removeUser(currentUsername));
    dispatch(addUser(newUsername));
    dispatch(
      receiveNotification(
        `${currentUsername} changed his name to ${newUsername}`
      )
    );
  });

  channel.on(USER_JOINED, ({username}) => {
    dispatch(addUser(username));
    if (username !== initialUsername) {
      dispatch(receiveNotification(`${username} has joined the room.`));
    }
  });

  channel.on(USER_QUIT, ({username}) => {
    dispatch(removeUser(username));
    dispatch(receiveNotification(`${username} has left the room.`));
  });

  channel.on(CHAT_MESSAGE, ({text, username, date}) => {
    dispatch(receiveMessage(text, username, new Date(date)));
  });
}

export default store => next => action => {
  switch (action.type) {
    case SET_USERNAME:
      init(action.payload, store.dispatch);
      break;
    case SEND_MESSAGE:
      channel.push(CHAT_MESSAGE, action.payload);
      break;
    case SEND_USERNAME_UPDATE:
      channel.push(USER_CHANGED, action.payload);
      break;
  }
  next(action);
};
