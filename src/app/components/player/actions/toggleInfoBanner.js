import { playerInternalHideInfoBannerThunkAction as hideInfoBanner } from './hideInfoBanner';
import { playerInternalShowInfoBannerThunkAction as showInfoBanner } from './showInfoBanner';

export const playerInternalToggleInfoBannerThunkAction = () => async (dispatch, getState) => {
  const state = getState();
  const { playerinternal: { isInfoBannerShown } } = state;
  if (isInfoBannerShown) {
    await dispatch(hideInfoBanner({ immediate: true }));
  } else {
    await dispatch(showInfoBanner());
  }
};
