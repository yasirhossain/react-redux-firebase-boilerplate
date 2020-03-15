import { createSelector } from 'reselect';
import { subselect } from './root';

const loadedRoomIdSelector = createSelector(
  chat => chat.roomId,
  roomId => roomId,
);

export const chatLoadedRoomIdSelector = subselect(loadedRoomIdSelector);
