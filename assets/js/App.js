import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import {combineReducers} from 'redux-immutable';
import Immutable from 'immutable';
import {p30, center} from 'js-common-styles';

import ChatWindow from './components/ChatWindow';
import JoinedUsers from './components/JoinedUsers';
import TextInput from './components/TextInput';
import UsernameSelect from './components/UsernameSelect';
import ChatSocket from './middleware/ChatSocket';
import messages from './modules/messages';
import users from './modules/users';
import {setUsername} from './modules/users';

const styles = {
    appContainer: {
        margin: '55px auto',
        width: '980px'
    },
    chatContainer: {
        backgroundColor: '#ffffff',
        borderRadius: '4px',
        boxShadow: '0 2px 6px 0 hsla(0, 0%, 0%, 0.2)',
        marginTop: '20px'
    }
};

function App() {
    return (
        <div css={styles.appContainer}>
            <h1 css={[p30, center]}>Welcome to React Chat!</h1>
            <div css={styles.chatContainer}>
                <ChatWindow />
                <JoinedUsers />
                <TextInput />
            </div>
            <UsernameSelect />
        </div>
    );
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers(
    {messages, users},
    Immutable.Record({
        messages: undefined,
        users: undefined
    })
);

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(ChatSocket))
);
store.dispatch(setUsername(window.chatUsername));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('reactContainer')
);
