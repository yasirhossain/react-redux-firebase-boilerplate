// Modules
import { SAVE_PLAYBACK_POSITION } from './types';

export const playerInternalSavePlaybackPositionAction = payload => ({
  type: SAVE_PLAYBACK_POSITION,
  payload,
});
