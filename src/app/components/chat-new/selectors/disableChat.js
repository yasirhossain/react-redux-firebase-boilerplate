import { createSelector } from 'reselect';
import { subselect } from './root';

const disableChatSelector = createSelector(
  chat => chat.disableChat,
  value => value,
);

export const chatDisableChatSelector = subselect(disableChatSelector);
