import { ENTERED_FULLSCREEN, EXITED_FULLSCREEN } from '../actions/types';

export const playerInternalFullscreen = (state = false, action) => {
  if (action.type === ENTERED_FULLSCREEN) {
    return true;
  }
  if (action.type === EXITED_FULLSCREEN) {
    return false;
  }
  return state;
};
