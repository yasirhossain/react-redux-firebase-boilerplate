import { createSelector } from 'reselect';
import { subselect } from './root';
import { messageDataSelector } from './messageData';

const messageIsSelectedSelector = createSelector(
  [
    chat => chat.selectedMessage,
    messageDataSelector,
  ],
  (selectedMessage, message) => (message.id === selectedMessage),
);

export const chatMessageIsSelectedSelector = subselect(messageIsSelectedSelector);
