import { createSelector } from 'reselect';
import { selectors } from 'app-webtech-core';
import { subselect } from './root';

export const messageDataSelector = createSelector(
  [
    chat => chat.chatUserId,
    chat => chat.messages,
    (_, props) => props.id,
    (state, props, globalState) => selectors.linearChannels.fetchById(globalState),
  ],
  (chatUserId, messages, id, channelById) => {
    let messageData = {};
    if (messages[id]) {
      const { channelId, ...message } = messages[id];
      messageData = {
        id,
        channel: channelById(channelId),
        isMine: message.chatUserId === chatUserId,
        ...message,
      };
    }
    return messageData;
  },
);

export const chatMessageDataSelector = subselect(messageDataSelector);
