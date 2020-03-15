import { createSelector } from 'reselect';
import { subselect } from './root';

export const messageUserLikedSelector = createSelector(
  [
    chat => chat.chatUserId,
    (chat, props) => chat.messages[props.id],
  ],
  (chatUserId, message) => !!(message && message.likes && message.likes[chatUserId]),
);

export const chatMessageUserLikedSelector = subselect(messageUserLikedSelector);
