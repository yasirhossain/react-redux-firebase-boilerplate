import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import Send from '@material-ui/icons/Send';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

const style = theme => ({
  messageInputContainer: {
    flex: [[1, 1, 'auto']],
  },
  messageButtonContainer: {
    marginLeft: theme.spacing.unit,
    '& button': {
      height: '100%',
      [theme.breakpoints.up('md')]: {
        '& div > span': {
          position: 'relative',
          padding: [[0, 10]],
        },
        '& svg': {
          position: 'relative',
          marginRight: 10,
        },
      },
    },
  },
  messageInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: [[5, 12]],
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    position: 'relative',
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
    [theme.breakpoints.down('sm')]: {
      padding: [[5, 12, 5, 40]],
    },
  },
  inputAvatar: {
    backgroundColor: '#8a8a8a',
    position: 'absolute',
    top: 6,
    left: 5,
    width: 30,
    height: 30,
    '& svg, & img': {
      width: '100%',
      height: '100%',
      opacity: 0.7,
      transition: 'opacity 0.5s',
    },
    '&:hover svg, &:hover img': {
      opacity: 1,
    },
  },
  errorPopper: {
    pointerEvents: ['none', '!important'],
  },
  errorTooltip: {
    backgroundColor: '#f50057',
  },
  emojiSelectorContainer: {
    position: 'fixed',
    bottom: 60,
    right: 5,
    overflowY: 'auto',
    maxHeight: '50%',
  },
});

class ChatInputUIComponent extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    userAvatar: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    charLimit: PropTypes.number,
    onSend: PropTypes.func,
    onKeyDown: PropTypes.func,
    onChange: PropTypes.func,
    setValue: PropTypes.func.isRequired,
  }

  static defaultProps = {
    userAvatar: null,
    value: '',
    placeholder: 'Chat here',
    error: null,
    charLimit: 0,
    onSend: () => { },
    onKeyDown: () => { },
    onChange: () => { },
  }

  state={
    showEmojiSelector: false,
  }

  onSend = () => {
    if (this.state.showEmojiSelector) {
      this.toggleEmojiSelector();
    }
    this.props.onSend();
  }

  addEmoji=(emoji) => {
    const inputEl = this.inputRef.current;
    const startPosition = inputEl.selectionStart;
    const endPosition = inputEl.selectionEnd;
    const start = inputEl.value.substring(0, startPosition);
    const end = inputEl.value.substring(endPosition);
    const text = start + emoji + end;
    this.props.setValue(text);
  }

  inputRef= React.createRef();
  toggleEmojiSelector = () => {
    this.setState({
      showEmojiSelector: !this.state.showEmojiSelector,
    });
  }


  render() {
    const {
      classes,
      userAvatar,
      value,
      placeholder,
      charLimit,
      error,
      onKeyDown,
      onChange,
    } = this.props;

    return (
      <Fragment>
        { this.state.showEmojiSelector &&
        <span className={classes.emojiSelectorContainer}>
          <Picker
            onSelect={emoji => this.addEmoji(emoji.native)}
            title="Select Emoji"
            showPreview={false}
          />
        </span>
        }
        <FormControl className={classes.messageInputContainer}>
          <Input
            inputRef={this.inputRef}
            value={value}
            className={classes.messageInput}
            disableUnderline
            placeholder={placeholder}
            startAdornment={
              <Hidden mdUp implementation="css">
                <Avatar className={classes.inputAvatar} src={userAvatar}>
                  {
                    !userAvatar ?
                      <AccountCircleIcon /> :
                      null
                  }
                </Avatar>
              </Hidden>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={this.toggleEmojiSelector}
                >
                  <TagFacesIcon />
                </IconButton>
              </InputAdornment>
            }
            onKeyDown={onKeyDown}
            onChange={onChange}
          />
        </FormControl>
        <FormControl className={classes.messageButtonContainer}>
          <Tooltip
            title={error}
            open={!!error}
            placement="top-start"
            disableFocusListener
            disableHoverListener
            disableTouchListener
            classes={{ popper: classes.errorPopper, tooltip: classes.errorTooltip }}
          >
            <Button variant="contained" color={error || charLimit < 0 ? 'secondary' : 'primary'} size="small" onClick={this.onSend}>
              <Hidden smDown implementation="css">
                <span>{charLimit}</span>
              </Hidden>
              <Send />
            </Button>
          </Tooltip>
        </FormControl>
      </Fragment>
    );
  }
}

export const ChatInputComponent = withStyles(style)(ChatInputUIComponent);
