// Modules
import { SAVE_PLAYBACK_POSITION } from '../actions/types';

export const playerInternalSavePlaybackPositionReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_PLAYBACK_POSITION:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
