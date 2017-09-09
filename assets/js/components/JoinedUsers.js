import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import {connect} from 'react-redux';
import {p22} from 'js-common-styles';

const styles = {
    container: {
        borderRadius: '0 4px 0 0',
        borderLeftWidth: '0',
        display: 'inline-block',
        boxSizing: 'border-box',
        height: '640px',
        paddingTop: '3px',
        position: 'relative',
        width: '185px',
        verticalAlign: 'top'
    },
    username: {
        overflow: 'hidden',
        padding: '5px 11px 0',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    }
};

function JoinedUsers({joinedUsers}) {
    return (
        <div css={[styles.container, p22]}>
            {joinedUsers.map((name, index) => (
                <div key={'d' + index} css={[styles.username, p22]}>
                    {name}
                </div>
            ))}
        </div>
    );
}

JoinedUsers.propTypes = {
    joinedUsers: PropTypes.instanceOf(Immutable.List)
};

//Container
const mapStateToProps = state => {
    return {joinedUsers: state.users.joinedUsers};
};

export default connect(mapStateToProps, null)(JoinedUsers);
