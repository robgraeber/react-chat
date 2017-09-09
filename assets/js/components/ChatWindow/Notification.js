import React from 'react';
import PropTypes from 'prop-types';
import {p18} from 'js-common-styles';

const styles = {
    container: {
        marginBottom: '5px'
    },
    username: {
        paddingRight: '10px'
    },
    notificationText: {
        color: '#666'
    }
};

function Notification({text}) {
    return (
        <div css={styles.container}>
            <div css={[styles.notificationText, p18]}>{text}</div>
        </div>
    );
}

Notification.propTypes = {
    text: PropTypes.string.isRequired
};

export default Notification;
