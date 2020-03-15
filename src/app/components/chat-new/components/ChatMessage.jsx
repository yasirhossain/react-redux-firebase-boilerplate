import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import PropTypes from 'prop-types';
import React from 'react';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { ChatAction } from './ChatAction';
import { roles } from '../constants/roles';

const animationSpeed = '150ms';

const styles = theme => ({
  root: {
    height: '100%',
    width: '100%',
    padding: [[15, 15]],
    boxSizing: 'border-box',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    transition: [['color', animationSpeed]],
    minHeight: 100,
    '&:before': {
      content: '""',
      display: 'block',
      borderRadius: 5,
      backgroundColor: '#FFFFFF',
      margin: 5,
      width: 'calc(100% - 10px)',
      height: 'calc(100% - 7px)',
      position: 'absolute',
      top: 0,
      left: 0,
      opacity: 0,
      transition: [['opacity', animationSpeed]],
    },
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: '80%',
      height: 1,
      right: 0,
      bottom: 0,
      backgroundColor: '#232323',
    },
    '&.ADMIN': {
      '& $avatar': {
        border: [[3, 'solid', theme.palette.primary.main]],
        animation: 'animationJelly 750ms linear both',
      },
    },
  },
  last: {
    animation: 'animationJelly 750ms linear both',
  },
  selected: {
    color: '#2C2C2C',
    position: 'relative',
    zIndex: 1,
    '&:before': {
      opacity: 1,
    },
    '& $message': {
      color: '#3F3F3F',
    },
  },
  avatar: {
    position: 'relative',
    borderRadius: '50%',
    backgroundColor: '#8a8a8a',
    overflow: 'hidden',
    height: 45,
    width: 45,
    minWidth: 45,
    backgroundSize: ['cover', '!important'],
    marginRight: 15,
    display: 'flex',
  },
  messageContainer: {
    flex: [[1, 1, 'auto']],
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  userName: {
    fontSize: 16,
    fontWeight: 800,
    margin: 0,
    marginBottom: 5,
  },
  message: {
    fontSize: 14,
    color: '#AAAAAA',
    wordBreak: 'break-word',
    margin: 0,
    transition: [['color', animationSpeed]],
  },
  status: {
    color: '#7d7d7d',
    fontSize: 12,
    marginBlockStart: '2px',
    marginBlockEnd: 0,
    cursor: 'pointer',
    '&:hover': {
      color: '#2A89FB',
    },
  },
  repliedMessage: {
    fontSize: 14,
    color: '#717171',
    wordBreak: 'break-word',
    margin: 0,
    fontStyle: 'italic',
  },
  actions: {
    display: 'flex',
    flex: [[0, 1, 'auto']],
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    transition: [['color', '300ms']],
    zIndex: 1,
  },
  '@keyframes animationJelly': {
    '0%': { transform: 'matrix3d(0.7, 0, 0, 0, 0, 0.7, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '2.083333%': { transform: 'matrix3d(0.75266, 0, 0, 0, 0, 0.76342, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '4.166667%': { transform: 'matrix3d(0.81071, 0, 0, 0, 0, 0.84545, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '6.25%': { transform: 'matrix3d(0.86808, 0, 0, 0, 0, 0.9286, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '8.333333%': { transform: 'matrix3d(0.92038, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '10.416667%': { transform: 'matrix3d(0.96482, 0, 0, 0, 0, 1.05202, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '12.5%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1.08204, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '14.583333%': { transform: 'matrix3d(1.02563, 0, 0, 0, 0, 1.09149, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '16.666667%': { transform: 'matrix3d(1.04227, 0, 0, 0, 0, 1.08453, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '18.75%': { transform: 'matrix3d(1.05102, 0, 0, 0, 0, 1.06666, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '20.833333%': { transform: 'matrix3d(1.05334, 0, 0, 0, 0, 1.04355, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '22.916667%': { transform: 'matrix3d(1.05078, 0, 0, 0, 0, 1.02012, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '25%': { transform: 'matrix3d(1.04487, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '27.083333%': { transform: 'matrix3d(1.03699, 0, 0, 0, 0, 0.98534, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '29.166667%': { transform: 'matrix3d(1.02831, 0, 0, 0, 0, 0.97688, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '31.25%': { transform: 'matrix3d(1.01973, 0, 0, 0, 0, 0.97422, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '33.333333%': { transform: 'matrix3d(1.01191, 0, 0, 0, 0, 0.97618, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '35.416667%': { transform: 'matrix3d(1.00526, 0, 0, 0, 0, 0.98122, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '37.5%': { transform: 'matrix3d(1, 0, 0, 0, 0, 0.98773, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '39.583333%': { transform: 'matrix3d(0.99617, 0, 0, 0, 0, 0.99433, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '41.666667%': { transform: 'matrix3d(0.99368, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '43.75%': { transform: 'matrix3d(0.99237, 0, 0, 0, 0, 1.00413, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '45.833333%': { transform: 'matrix3d(0.99202, 0, 0, 0, 0, 1.00651, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '47.916667%': { transform: 'matrix3d(0.99241, 0, 0, 0, 0, 1.00726, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '50%': { transform: 'matrix3d(0.99329, 0, 0, 0, 0, 1.00671, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '52.083333%': { transform: 'matrix3d(0.99447, 0, 0, 0, 0, 1.00529, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '54.166667%': { transform: 'matrix3d(0.99577, 0, 0, 0, 0, 1.00346, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '56.25%': { transform: 'matrix3d(0.99705, 0, 0, 0, 0, 1.0016, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '58.333333%': { transform: 'matrix3d(0.99822, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '60.416667%': { transform: 'matrix3d(0.99921, 0, 0, 0, 0, 0.99884, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '62.5%': { transform: 'matrix3d(1, 0, 0, 0, 0, 0.99816, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '64.583333%': { transform: 'matrix3d(1.00057, 0, 0, 0, 0, 0.99795, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '66.666667%': { transform: 'matrix3d(1.00095, 0, 0, 0, 0, 0.99811, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '68.75%': { transform: 'matrix3d(1.00114, 0, 0, 0, 0, 0.99851, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '70.833333%': { transform: 'matrix3d(1.00119, 0, 0, 0, 0, 0.99903, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '72.916667%': { transform: 'matrix3d(1.00114, 0, 0, 0, 0, 0.99955, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '75%': { transform: 'matrix3d(1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '77.083333%': { transform: 'matrix3d(1.00083, 0, 0, 0, 0, 1.00033, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '79.166667%': { transform: 'matrix3d(1.00063, 0, 0, 0, 0, 1.00052, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '81.25%': { transform: 'matrix3d(1.00044, 0, 0, 0, 0, 1.00058, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '83.333333%': { transform: 'matrix3d(1.00027, 0, 0, 0, 0, 1.00053, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '85.416667%': { transform: 'matrix3d(1.00012, 0, 0, 0, 0, 1.00042, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '87.5%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1.00027, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '89.583333%': { transform: 'matrix3d(0.99991, 0, 0, 0, 0, 1.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '91.666667%': { transform: 'matrix3d(0.99986, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '93.75%': { transform: 'matrix3d(0.99983, 0, 0, 0, 0, 0.99991, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '95.833333%': { transform: 'matrix3d(0.99982, 0, 0, 0, 0, 0.99985, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '97.916667%': { transform: 'matrix3d(0.99983, 0, 0, 0, 0, 0.99984, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '100%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  },
});

class ChatMessageUIComponent extends React.Component {
  static propTypes = {
    avatarUrl: PropTypes.string,
    channel: PropTypes.shape({}),
    chatName: PropTypes.string,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    className: PropTypes.string,
    closeButtonAction: PropTypes.func,
    flagUserButtonAction: PropTypes.func,
    isMine: PropTypes.bool,
    isSelected: PropTypes.bool,
    likesCount: PropTypes.number,
    playChannel: PropTypes.func,
    message: PropTypes.string,
    onClick: PropTypes.func,
    replyMessage: PropTypes.func,
    pinButtonAction: PropTypes.func,
    role: PropTypes.string,
    showCloseButton: PropTypes.bool,
    showFlagButton: PropTypes.bool,
    showPinButton: PropTypes.bool,
    reply: PropTypes.shape({
      chatName: PropTypes.string,
      message: PropTypes.string,
    }),
    toggleFavoriteMessage: PropTypes.func,
    userLiked: PropTypes.bool,
    isLast: PropTypes.bool,
  };

  static defaultProps = {
    avatarUrl: null,
    channel: null,
    chatName: 'John Doe',
    className: null,
    likesCount: 0,
    message: 'x . x . x . x',
    role: roles.NORMAL,
    isLast: false,
    isSelected: false,
    showCloseButton: false,
    showFlagButton: false,
    showPinButton: false,
    reply: null,
    isMine: false,
    userLiked: false,
    closeButtonAction: () => { },
    flagUserButtonAction: () => { },
    onClick: () => { },
    pinButtonAction: () => { },
    playChannel: () => { },
    replyMessage: () => { },
    toggleFavoriteMessage: () => { },
  };

  render() {
    const {
      avatarUrl,
      channel,
      chatName,
      classes,
      className,
      closeButtonAction,
      flagUserButtonAction,
      isMine,
      isSelected,
      likesCount,
      message,
      onClick,
      pinButtonAction,
      playChannel,
      role,
      reply,
      replyMessage,
      showCloseButton,
      showFlagButton,
      showPinButton,
      toggleFavoriteMessage,
      userLiked,
      isLast,
    } = this.props;

    const rootClasses = classNames(
      [
        className,
        classes.root,
        role,
      ],
      {
        [classes.last]: isLast,
        [classes.selected]: isSelected,
        mine: isMine,
      },
    );

    let headerText = chatName;
    let repliedMessage;
    if (reply) {
      headerText = `${chatName} replied to ${reply.chatName}`;
      repliedMessage = reply.message;
    }

    const FavoriteIcon = userLiked ? StarIcon : StarBorderIcon;

    return (
      <div className={rootClasses}>
        <Avatar src={avatarUrl} className={classes.avatar} />
        <div className={classes.messageContainer}>
          <h1 className={classes.userName}>{headerText}</h1>
          {repliedMessage ? <p className={classes.repliedMessage}>-{repliedMessage}</p> : null}
          <p className={classes.message} onClick={onClick}>{message}</p>
          {channel && (
            <p onClick={playChannel} className={classes.status}>Watching {channel.name}</p>
          )}
        </div>
        <div className={classes.actions}>
          {showCloseButton && <ChatAction icon={CloseIcon} onClick={closeButtonAction} />}
          {showFlagButton && (
            <ChatAction
              icon={FlagOutlinedIcon}
              onClick={flagUserButtonAction}
              title={`flag “${chatName}”`}
            />
          )}
          {showPinButton && <ChatAction icon={WhatshotIcon} onClick={pinButtonAction} />}
          {!isMine && !isSelected && <ChatAction icon={FormatQuoteIcon} onClick={replyMessage} /> }
          <ChatAction icon={FavoriteIcon} onClick={toggleFavoriteMessage} />
          {likesCount > 0 ? likesCount : null}
        </div>
      </div>
    );
  }
}

export const ChatMessageComponent = withStyles(styles)(ChatMessageUIComponent);
