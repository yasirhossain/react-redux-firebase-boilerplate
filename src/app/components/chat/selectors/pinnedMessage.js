import { createSelector } from 'reselect';
import { subselect } from './root';

const pinnedMessageSelector = createSelector(
  chat => chat.pinnedMessage,
  value => value,
);

export const chatPinnedMessageSelector = subselect(pinnedMessageSelector);
