import { helpers, actions } from 'app-webtech-core';
import { RESET_CAPTIONS_SETTINGS } from './types';

export const resetCaptionsSettingsAction = () => ({
  type: RESET_CAPTIONS_SETTINGS,
});

const playerInternalResetCCSettingsBannerAction = helpers.actions.actionCreator(RESET_CAPTIONS_SETTINGS);

export const playerInternalResetCaptionsSettingsThunkAction = () => (dispatch) => {
  dispatch(playerInternalResetCCSettingsBannerAction());
  dispatch(actions.player.ccMenuReset());
};
