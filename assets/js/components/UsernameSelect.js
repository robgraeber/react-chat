import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import {connect} from 'react-redux';
import {p18} from 'js-common-styles';
import {setUsername, sendUsernameUpdate} from '../modules/users';

const styles = {
  container: {
    marginTop: '45px',
    textAlign: 'center'
  },
  displayText: {
    display: 'inline-block',
    marginRight: '10px',
    verticalAlign: 'middle'
  },
  inputField: {
    border: 0,
    borderRadius: '4px',
    boxShadow: '0 2px 6px 0 hsla(0, 0%, 0%, 0.15)',
    height: '25px',
    padding: '4px 5px',
    verticalAlign: 'middle'
  }
};

class UsernameSelect extends React.Component {
  onSubmit = e => {
    e.preventDefault();
    if (this.inputField.value) {
      this.props.onSubmit(
        this.inputField.value,
        this.props.currentUsername,
        this.props.joinedUsers
      );
    }
  };
  render() {
    return (
      <div css={styles.container}>
        <form onSubmit={this.onSubmit}>
          <span css={[styles.displayText, p18]}>Your Display Name:</span>
          <input
            css={[styles.inputField, p18]}
            ref={el => (this.inputField = el)}
            defaultValue={this.props.currentUsername}
            type="text"
            maxLength="13"
          />
        </form>
      </div>
    );
  }
}

UsernameSelect.propTypes = {
  currentUsername: PropTypes.string.isRequired,
  joinedUsers: PropTypes.instanceOf(Immutable.List)
};

//Container
const mapStateToProps = state => {
  return {
    currentUsername: state.users.currentUsername,
    joinedUsers: state.users.joinedUsers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (newUsername, currentUsername, joinedUsers) => {
      const alreadyInUse = joinedUsers.indexOf(newUsername) !== -1;
      if (newUsername !== currentUsername && !alreadyInUse) {
        dispatch(setUsername(newUsername));
        dispatch(sendUsernameUpdate(newUsername, currentUsername));
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsernameSelect);
