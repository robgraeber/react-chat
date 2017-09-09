import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {p20} from 'js-common-styles';
import {sendMessage} from '../modules/messages';

//View
const styles = {
  container: {
    borderRadius: '0 0 4px 4px',
    borderTopWidth: '0',
    boxSizing: 'border-box',
    position: 'relative',
    height: '45px'
  },
  formBox: {
    height: '100%'
  },
  messageBox: {
    boxSizing: 'border-box',
    height: '100%',
    padding: '0 8px',
    width: '100%'
  }
};

class InputWindow extends React.Component {
  onSubmit = e => {
    e.preventDefault();
    if (this.inputField.value) {
      this.props.onSubmit(this.inputField.value, this.props.username);
      this.inputField.value = '';
    }
  };

  render() {
    return (
      <div css={styles.container}>
        <form css={styles.formBox} onSubmit={this.onSubmit}>
          <input
            css={[styles.messageBox, p20]}
            type="text"
            ref={el => (this.inputField = el)}
            placeholder="Type your message here…"
          />
        </form>
      </div>
    );
  }
}

InputWindow.propTypes = {
  username: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

//Container
const mapStateToProps = state => ({
  username: state.users.currentUsername
});

const mapDispatchToProps = dispatch => ({
  onSubmit(value, username) {
    dispatch(sendMessage(value, username));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InputWindow);
