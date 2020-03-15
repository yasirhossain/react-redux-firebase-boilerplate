import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectors } from 'app-webtech-core';
import * as chatSelectors from '../selectors';
import * as chatActions from '../actions';
import { ChatComponent } from '../components/Chat';

class ChatContainer extends PureComponent {
  static propTypes = {
    roomId: PropTypes.string,
    loadedRoomId: PropTypes.string,
    loadRoom: PropTypes.func.isRequired,
    associateChatUser: PropTypes.func.isRequired,
  }

  static defaultProps = {
    roomId: null,
    loadedRoomId: null,
  }

  async componentDidMount() {
    const {
      loadRoom,
      roomId,
    } = this.props;

    if (roomId) {
      await loadRoom(roomId);
    }
  }

  async componentDidUpdate(prevProps) {
    const {
      associateChatUser,
      loadRoom,
      roomId,
      userId,
    } = this.props;
    if (prevProps.loadedRoomId !== roomId && roomId) {
      await loadRoom(roomId);
    }

    if (prevProps.userId !== userId && !!prevProps.loadedRoomId) {
      await associateChatUser();
    }
  }

  render() {
    return <ChatComponent isVisible />;
  }
}

const mapStateToProps = (state, ownProps) => {
  let userId = null;
  const { data: userAccountData } = selectors.userAccount.properties(state);
  if (userAccountData) {
    ({ _id: userId } = userAccountData);
  }

  return {
    roomId: 'general',
    loadedRoomId: chatSelectors.loadedRoomId(state, ownProps),
    userId,
  };
};

const mapDispatchToProps = ({
  associateChatUser: chatActions.associateChatUser,
  loadRoom: chatActions.loadRoom,
});

export const ChatOnly = connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
