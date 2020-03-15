import { createSelector } from 'reselect';
import { subselect } from './root';

const selectedMessageSelector = createSelector(
  [
    chat => chat.selectedMessage,
    chat => chat.messages,
  ],
  (selectedMessage, messages) => {
    let messageData;
    if (messages[selectedMessage]) {
      messageData = {
        id: selectedMessage,
        ...messages[selectedMessage],
      };
    }
    return messageData;
  },
);

export const chatSelectedMessageSelector = subselect(selectedMessageSelector);
