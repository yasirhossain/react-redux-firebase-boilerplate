import { actions, selectors } from 'app-webtech-core';
import { playerInternalShowInfoBannerThunkAction as showInfoBanner } from './showInfoBanner';

export const playerInternalExitFullscreenThunkAction = () => async (dispatch, getState) => {
  await dispatch(actions.player.exitedFullscreen());
  const { selectedIndex, list } = selectors.guide.properties(getState());
  const { id } = list[selectedIndex];
  await dispatch(actions.player.setInfoBanner({ id }));
  await dispatch(showInfoBanner());
};
