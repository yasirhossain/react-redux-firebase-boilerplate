import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { triviaAuthenticatedUserIdSelector } from 'app-modules/trivia/selectors/authenticatedUserId';
import * as chatSelectors from '../selectors';
import * as chatActions from '../actions';
import { ChatComponent } from '../components/Chat';

class ChatContainer extends PureComponent {
  static propTypes = {
    isEnabled: PropTypes.bool.isRequired,
    isVisible: PropTypes.bool,
    loadedRoomId: PropTypes.string,
    isEnabledByUrl: PropTypes.bool,
    enable: PropTypes.func.isRequired,
    disable: PropTypes.func.isRequired,
    associateChatUser: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isVisible: false,
    loadedRoomId: null,
    isEnabledByUrl: null,
  }

  async componentDidMount() {
    const {
      isEnabledByUrl,
      enable,
      disable,
      userId,
      loadedRoomId,
      associateChatUser,
    } = this.props;
    if (isEnabledByUrl !== null) {
      if (isEnabledByUrl) {
        await enable();
      } else {
        await disable();
      }
    }

    if (userId) {
      if (loadedRoomId) {
        await associateChatUser();
      } else {
        this.associateUserOnNextUpdate = true;
      }
    }
  }

  async componentDidUpdate(prevProps) {
    const {
      associateChatUser,
      userId,
    } = this.props;

    if (
      (prevProps.userId !== userId && !!prevProps.loadedRoomId) ||
      this.associateUserOnNextUpdate
    ) {
      await associateChatUser();
      this.associateUserOnNextUpdate = false;
    }
  }

  associateUserOnNextUpdate = false

  render() {
    const { isEnabled, ...props } = this.props;
    return isEnabled && <ChatComponent {...props} />;
  }
}

const mapStateToProps = (state, ownProps) => ({
  isBanned: chatSelectors.isBanned(state, ownProps),
  isEnabledByUrl: chatSelectors.isEnabledByUrl(state, ownProps),
  isEnabled: chatSelectors.isEnabled(state, ownProps),
  isVisible: chatSelectors.isVisible(state, ownProps),
  loadedRoomId: chatSelectors.loadedRoomId(state, ownProps),
  userId: triviaAuthenticatedUserIdSelector(state, ownProps),
});

const mapDispatchToProps = ({
  associateChatUser: chatActions.associateChatUser,
  enable: chatActions.enable,
  disable: chatActions.disable,
});

export const Chat = connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
