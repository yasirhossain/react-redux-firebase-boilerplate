import { createSelector } from 'reselect';
import get from 'lodash/get';
import { subselect } from './root';
import { nameGenerator } from '../helpers/nameGenerator';

const chatNameSelector = createSelector(
  [
    chat => chat.chatName,
    (state, props, globalState) => get(globalState.userAccount, 'data.displayName'),
  ],
  (chatName, displayName) => chatName || displayName || nameGenerator(),
);

export const chatChatNameSelector = subselect(chatNameSelector);
