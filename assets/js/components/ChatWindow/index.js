import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import {connect} from 'react-redux';
import Message from './Message';
import Notification from './Notification';

//View
const styles = {
  chatWindow: {
    borderRight: '1px solid #ccc',
    borderRadius: '4px 0 0 0',
    boxSizing: 'border-box',
    display: 'inline-block',
    height: '640px',
    position: 'relative',
    width: '795px',
    verticalAlign: 'top'
  },
  bottomFixed: {
    boxSizing: 'border-box',
    bottom: '0',
    maxHeight: '100%',
    overflowY: 'auto',
    position: 'absolute',
    padding: '5px 12px',
    width: '100%'
  }
};

class ChatWindow extends React.Component {
  scrollToBottom = () => {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({behavior: 'smooth'});
  };
  componentWillUpdate() {
    this.isScrolledToBottom =
      this.scrollWindow.scrollTop + this.scrollWindow.clientHeight - 10 >=
      this.contentWindow.clientHeight;
  }
  componentDidUpdate() {
    if (this.isScrolledToBottom) {
      this.scrollToBottom();
    }
  }
  render() {
    return (
      <div css={styles.chatWindow}>
        <div css={styles.bottomFixed} ref={el => (this.scrollWindow = el)}>
          <div ref={el => (this.contentWindow = el)}>
            {this.props.messages.size === 0 && (
              <Notification text="Welcome to React Chat! Why don't you say something?" />
            )}
            {this.props.messages.size &&
              this.props.messages.map(message => {
                if (message.username) {
                  return (
                    <Message
                      key={message.date.toISOString()}
                      text={message.text}
                      username={message.username}
                      date={message.date}
                    />
                  );
                } else {
                  return (
                    <Notification
                      key={message.date.toISOString()}
                      text={message.text}
                    />
                  );
                }
              })}
            <div
              ref={el => {
                this.messagesEnd = el;
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

ChatWindow.propTypes = {
  messages: PropTypes.instanceOf(Immutable.List)
};

//Container
const mapStateToProps = state => ({messages: state.messages});

export default connect(mapStateToProps, null)(ChatWindow);
