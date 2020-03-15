import { helpers, selectors } from 'app-webtech-core';
import { HIDE_INFO_BANNER } from './types';
import { HIDE_BUMPER_AFTER_MS } from '../constants/actions';

let timeoutHandler;

const playerInternalHideInfoBannerAction = helpers.actions.actionCreator(HIDE_INFO_BANNER);

export const playerInternalHideInfoBannerThunkAction =
  ({ immediate, timeout = HIDE_BUMPER_AFTER_MS } = {}) => (dispatch, getState) => {
    const state = getState();
    const { isFullscreen: playerIsFullscreen } = selectors.player.properties(state);
    if (timeoutHandler) {
      timeoutHandler = clearTimeout(timeoutHandler);
    }
    if (playerIsFullscreen) {
      if (immediate) {
        dispatch(playerInternalHideInfoBannerAction());
      } else {
        timeoutHandler = setTimeout(() => {
          dispatch(playerInternalHideInfoBannerAction());
        }, timeout);
      }
    }
  };
