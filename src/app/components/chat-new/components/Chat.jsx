import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { HEADER_HEIGHT } from 'app-modules/base/constants';
import { BannedUserDialog } from './BannedUserDialog';
import { ChatMessages } from '../containers/ChatMessages';
import { ChatInput } from '../containers/ChatInput';
import { ChatSelectedMessage } from '../containers/ChatSelectedMessage';
import { PinnedChatMessage } from '../containers/PinnedChatMessage';

const style = theme => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column-reverse',
    [theme.breakpoints.down('sm')]: {
      height: `calc(100% - ${HEADER_HEIGHT}px)`,
    },
  },
  inputContainer: {
    backgroundColor: '#232323',
    display: 'flex',
    padding: theme.spacing.unit,
    order: 0,
    zIndex: 1,
  },
  messageList: {
    flex: [[1, 1, 'auto']],
    order: 1,
    display: 'flex',
    flexDirection: 'column',
    '& > .pinned-message': {
      flex: 0,
    },
    '& > .message-list': {
      flex: [[1, 1, 'auto']],
    },
  },
  selectedMessage: {
    position: ['absolute', '!important'],
    bottom: 0,
    left: 0,
    height: ['inherit', '!important'],
    '&:after': {
      display: 'none',
    },
  },
});

class ChatUIComponent extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    isBanned: PropTypes.bool,
    isVisible: PropTypes.bool,
  }

  static defaultProps = {
    isBanned: false,
    isVisible: false,
  }

  render() {
    const { classes, isBanned, isVisible } = this.props;
    return (
      <div className={classes.container} style={{ display: (isVisible ? 'flex' : 'none') }}>
        <div className={classes.messageList}>
          <div className="pinned-message">
            <PinnedChatMessage />
          </div>
          <div className="message-list">
            <ChatMessages />
            <ChatSelectedMessage className={classes.selectedMessage} />
          </div>
        </div>
        {isBanned && <BannedUserDialog />}
        {!isBanned && (
          <div className={classes.inputContainer}>
            <ChatInput />
          </div>
        )}
      </div>
    );
  }
}

export const ChatComponent = withStyles(style)(ChatUIComponent);
