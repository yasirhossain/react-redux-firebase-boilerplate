import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as chatSelectors from '../selectors';
import * as chatActions from '../actions';
import { ChatInputComponent } from '../components/ChatInput';
import Filter from 'bad-words';

class ChatInputContainer extends Component {
  static propTypes = {
    userAvatar: PropTypes.string.isRequired,
    charLimit: PropTypes.number,
    selectedMessage: PropTypes.shape({}),
    sendMessage: PropTypes.func.isRequired,
    clearSelectedMessage: PropTypes.func.isRequired,
  }

  static defaultProps = {
    charLimit: 75,
    selectedMessage: null,
  }

  state = {
    value: '',
    availableChars: this.props.charLimit,
    error: '',
    lastSentValue: null,
    validate: false,
  }

  onChange = (e) => {
    const { value } = e.target;
    if (this.state.validate) {
      this.validateValue(value);
    }
    this.setState({
      value,
      availableChars: this.props.charLimit - value.length,
    });
  }

  setValue = (val) => {
    if (this.state.validate) {
      this.validateValue(val);
    }
    this.setState({
      value: val,
      availableChars: this.props.charLimit - val.length,
    });
  }

  onSend = () => {
    const { sendMessage, clearSelectedMessage } = this.props;
    const { value: chatText } = this.state;
    if (this.validateValue(chatText)) {
      sendMessage(chatText);
      this.clearInput();
      clearSelectedMessage();
    }
  }

  onKeyDown = (e) => {
    e.stopPropagation();
    const isEnter = e.keyCode === 13;
    if (isEnter) {
      this.onSend();
    }
  }

  validateValue = (value) => {
    const { lastSentValue } = this.state;
    const { charLimit } = this.props;
    const valueLength = value.length;
    const trimedValueLength = value.trim().length;
    const badWordFilter = new Filter();

    let isValid = true;
    this.setState({ error: '', validate: true });
    if (valueLength < 2) {
      this.setState({ error: 'Please type a longer message.' });
      isValid = false;
    } else if (trimedValueLength < 2) {
      this.setState({ error: 'Sorry, no empty messages.' });
      isValid = false;
    } else if (valueLength > charLimit) {
      this.setState({ error: 'Please type a shorter message.' });
      isValid = false;
    } else if (value === lastSentValue) {
      this.setState({ error: 'Sorry, no duplicate messages.' });
      isValid = false;
    } else if (badWordFilter.isProfane(value)) {
      this.setState({ error: 'Sorry, no bad language!' });
      isValid = false;
    }

    return isValid;
  }

  clearInput = () => {
    const { value } = this.state;
    this.setState({
      value: '',
      lastSentValue: value,
      error: '',
      validate: false,
      availableChars: this.props.charLimit,
    });
  }

  render() {
    const { userAvatar, selectedMessage } = this.props;
    const { value, error, availableChars } = this.state;

    let placeholder = 'Chat here';
    if (selectedMessage && selectedMessage.chatName) {
      placeholder = `Reply to ${selectedMessage.chatName}`;
    }

    return (
      <ChatInputComponent
        userAvatar={userAvatar}
        onSend={this.onSend}
        onKeyDown={this.onKeyDown}
        onChange={this.onChange}
        value={value}
        placeholder={placeholder}
        error={error}
        charLimit={availableChars}
        setValue={this.setValue}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  userAvatar: chatSelectors.userAvatar(state, ownProps),
  selectedMessage: chatSelectors.selectedMessage(state, ownProps),
});

const mapDispatchToProps = {
  sendMessage: chatActions.sendMessage,
  clearSelectedMessage: chatActions.clearSelectedMessage,
};

export const ChatInput = connect(mapStateToProps, mapDispatchToProps)(ChatInputContainer);
