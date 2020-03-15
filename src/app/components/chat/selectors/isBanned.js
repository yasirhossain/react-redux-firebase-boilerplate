import { createSelector } from 'reselect';
import { subselect } from './root';

export const isBannedSelector = createSelector(
  [chat => chat.isBanned],
  isBanned => isBanned,
);

export const chatIsBannedSelector = subselect(isBannedSelector);
