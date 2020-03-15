import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Slide from '@material-ui/core/Slide';
import * as chatSelectors from '../selectors';
import * as chatActions from '../actions';
import { ChatMessageComponent } from '../components/ChatMessage';

class PinnedChatMessageController extends Component {
  static propTypes = {
    pinnedMessage: PropTypes.shape({
      id: PropTypes.string,
      avatarUrl: PropTypes.string,
      chatName: PropTypes.string,
      message: PropTypes.string,
      reply: PropTypes.shape({}),
    }),
    clearPinnedMessage: PropTypes.func.isRequired,
    toggleFavoriteMessage: PropTypes.func.isRequired,
  }

  static defaultProps = {
    pinnedMessage: null,
  }

  render() {
    const {
      clearPinnedMessage,
      pinnedMessage,
      toggleFavoriteMessage,
      ...props
    } = this.props;
    return (
      pinnedMessage ?
        <Slide direction="up" in>
          <ChatMessageComponent
            {...props}
            avatarUrl={pinnedMessage.avatarUrl}
            chatName={pinnedMessage.chatName}
            message={pinnedMessage.message}
            role={pinnedMessage.role}
            reply={pinnedMessage.reply}
            isSelected
            closeButtonAction={clearPinnedMessage}
            toggleFavoriteMessage={toggleFavoriteMessage}
            showCloseButton
          />
        </Slide> :
        null
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  pinnedMessage: chatSelectors.pinnedMessage(state, ownProps),
});

const mapDispatchToProps = {
  clearPinnedMessage: chatActions.clearPinnedMessage,
  toggleFavoriteMessage: chatActions.toggleFavoriteMessage,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { pinnedMessage } = stateProps;
  const { clearPinnedMessage, toggleFavoriteMessage } = dispatchProps;

  return {
    ...ownProps,
    pinnedMessage,
    clearPinnedMessage,
    likesCount: Object.keys((pinnedMessage && pinnedMessage.likes) || {}).length,
    toggleFavoriteMessage: () => {
      if (pinnedMessage) {
        const { id } = pinnedMessage;
        toggleFavoriteMessage(id);
      }
    },
  };
};

export const PinnedChatMessage =
  connect(mapStateToProps, mapDispatchToProps, mergeProps)(PinnedChatMessageController);
