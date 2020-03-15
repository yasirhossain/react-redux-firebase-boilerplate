import { selectors } from 'app-webtech-core';
import { playerInternalExitFullscreenThunkAction as exitFullscreen } from './exitFullscreen';
import { playerInternalEnterFullscreenThunkAction as enterFullscreen } from './enterFullscreen';

export const playerInternalToggleFullscreenThunkAction = () => async (dispatch, getState) => {
  const state = getState();
  const { isFullscreen: playerIsFullscreen } = selectors.player.properties(state);
  if (playerIsFullscreen) {
    await dispatch(exitFullscreen());
  } else {
    await dispatch(enterFullscreen());
  }
};
