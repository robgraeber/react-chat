import React from 'react';
import Moment from 'moment';
import PropTypes from 'prop-types';
import {p14, p18, p22} from 'js-common-styles';

const styles = {
  container: {
    marginBottom: '5px'
  },
  username: {
    paddingRight: '10px'
  }
};

function Message({text, date, username}) {
  return (
    <div css={styles.container}>
      <div>
        <span css={[styles.username, p22]}>{username}</span>
        <span css={p14}>{Moment(date).format('MMM-D h:mm A')}</span>
      </div>
      <div css={p18}>{text}</div>
    </div>
  );
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date)
};

export default Message;
