import { createSelector } from 'reselect';

export const chatIsEnabledByUrlSelector = createSelector(
  state => state.location,
  ({ query = {} }) => {
    const { chat = '' } = query;
    if (chat.toLowerCase() === 'on') return true;
    if (chat.toLowerCase() === 'off') return false;
    return null;
  },
);

