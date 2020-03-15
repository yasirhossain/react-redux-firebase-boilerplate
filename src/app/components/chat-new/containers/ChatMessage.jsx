import { connect } from 'react-redux';
import { actions, constants } from 'app-webtech-core';
import * as chatSelectors from '../selectors';
import * as chatActions from '../actions';
import { ChatMessageComponent } from '../components/ChatMessage';

const { GUIDE_LIST_ITEM_KIND } = constants.guide;

const mapStateToProps = (state, ownProps) => ({
  isAdmin: chatSelectors.isAdmin(state, ownProps),
  userLiked: chatSelectors.messageUserLiked(state, ownProps),
  messageData: chatSelectors.messageData(state, ownProps),
  channelsList: state.guide.list,
});

const mapDispatchToProps = {
  clearSelectedMessage: chatActions.clearSelectedMessage,
  deleteMessage: chatActions.deleteMessage,
  flagUser: chatActions.flagUser,
  pinMessage: chatActions.pinMessage,
  playChannel: actions.guide.playChannelAtIndex,
  selectMessage: chatActions.selectMessage,
  toggleFavoriteMessage: chatActions.toggleFavoriteMessage,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { messageData, isAdmin, ...state } = stateProps;
  const { channel } = messageData;
  const { id } = ownProps;

  const channelIndex = channel && stateProps.channelsList
    // eslint-disable-next-line no-underscore-dangle
    .findIndex(c => c.kind === GUIDE_LIST_ITEM_KIND.CHANNEL && c.id === channel._id);

  const closeButtonAction = dispatchProps.deleteMessage.bind(null, id);
  const flagUserButtonAction = dispatchProps.flagUser.bind(null, id);
  const onClick = dispatchProps.selectMessage.bind(null, id);
  const replyMessage = onClick;
  const pinButtonAction = dispatchProps.pinMessage.bind(null, id);
  const playChannel = dispatchProps.playChannel.bind(null, {
    index: channelIndex,
    setSelected: true,
  });
  const toggleFavoriteMessage = dispatchProps.toggleFavoriteMessage.bind(null, id);

  return {
    ...state,
    ...ownProps,
    ...messageData,
    closeButtonAction,
    flagUserButtonAction,
    likesCount: Object.keys(messageData.likes || {}).length,
    onClick,
    replyMessage,
    pinButtonAction,
    playChannel,
    showCloseButton: isAdmin,
    showFlagButton: isAdmin,
    showPinButton: isAdmin,
    toggleFavoriteMessage,
  };
};

export const ChatMessage =
  connect(mapStateToProps, mapDispatchToProps, mergeProps, { pure: true })(ChatMessageComponent);
