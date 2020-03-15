import { createSelector } from 'reselect';
import { subselect } from './root';

export const userIdSelector = createSelector(
  [
    chat => chat.chatUserId,
  ],
  value => value,
);

export const chatUserIdSelector = subselect(userIdSelector);
