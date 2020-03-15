import { createSelector } from 'reselect';

export const chatRoomToLoadSelector = createSelector(
  [state => state.player.content || {}],
  // ({ id, kind }) => (kind ? `${kind}-${id}` : null),
  () => 'general',
);
