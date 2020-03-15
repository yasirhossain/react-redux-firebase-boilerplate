import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as chatSelectors from '../selectors';
import * as chatActions from '../actions';
import { ChatMessageComponent } from '../components/ChatMessage';

class ChatSelectedMessageController extends Component {
  static propTypes = {
    className: PropTypes.string,
    selectedMessage: PropTypes.shape({
      id: PropTypes.string,
      avatarUrl: PropTypes.string,
      chatName: PropTypes.string,
      message: PropTypes.string,
      reply: PropTypes.shape({}),
    }),
    clearSelectedMessage: PropTypes.func.isRequired,
  }

  static defaultProps = {
    className: null,
    selectedMessage: null,
  }

  render() {
    const { selectedMessage, className } = this.props;
    return (
      selectedMessage ?
        <ChatMessageComponent
          id={selectedMessage.id}
          avatarUrl={selectedMessage.avatarUrl}
          chatName={selectedMessage.chatName}
          message={selectedMessage.message}
          role={selectedMessage.role}
          reply={selectedMessage.reply}
          isSelected
          closeButtonAction={this.props.clearSelectedMessage}
          showCloseButton
          className={className}
        /> :
        null
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  selectedMessage: chatSelectors.selectedMessage(state, ownProps),
});

const mapDispatchToProps = {
  clearSelectedMessage: chatActions.clearSelectedMessage,
  selectMessage: chatActions.selectMessage,
  toggleFavoriteMessage: chatActions.toggleFavoriteMessage,
};

export const ChatSelectedMessage =
  connect(mapStateToProps, mapDispatchToProps)(ChatSelectedMessageController);
