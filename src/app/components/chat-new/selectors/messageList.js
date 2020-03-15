import { createSelector } from 'reselect';
import { subselect } from './root';

export const messageListSelector = createSelector(
  chat => chat.messageList,
  value => value || [],
);

export const chatMessageListSelector = subselect(messageListSelector);
