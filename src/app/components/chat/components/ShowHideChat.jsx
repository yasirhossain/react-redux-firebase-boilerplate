import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ChatIcon from '@material-ui/icons/Chat';

const style = theme => ({
  container: {
    position: 'absolute',
    zIndex: 99,
    top: 10,
    right: -5,
    background: '#2A89FB',
    padding: '8px 10px 4px 10px',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    cursor: 'pointer',
    transition: 'color 0.2s ease-in',
    '&:hover': {
      background: '#2A89FB',
    },
  },
});

class ShowHideChat extends PureComponent {
  static propTypes = {
    toggle: PropTypes.func.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    isChatEnabled: PropTypes.bool.isRequired,
  };

  render() {
    const { classes, toggle, isChatEnabled } = this.props;
    if (!isChatEnabled) {
      return null;
    }
    return (
      <div className={classes.container}>
        <ChatIcon onClick={toggle} />
      </div>
    );
  }
}

export const ShowHideChatContainer = withStyles(style)(ShowHideChat);
