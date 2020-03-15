import { helpers } from 'app-webtech-core';
import { SHOW_INFO_BANNER } from './types';
import { playerInternalHideInfoBannerThunkAction as hideInfoBanner } from './hideInfoBanner';

const playerInternalShowInfoBannerAction = helpers.actions.actionCreator(SHOW_INFO_BANNER);

export const playerInternalShowInfoBannerThunkAction = () => (dispatch) => {
  dispatch(playerInternalShowInfoBannerAction());
  dispatch(hideInfoBanner());
};
