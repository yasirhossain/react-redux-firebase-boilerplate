import { HIDE_INFO_BANNER, SHOW_INFO_BANNER } from '../actions/types';

export const playerInternalInfoBannerShownReducer = (previousState = true, action) => {
  let newState = previousState;
  const { type } = action;
  if (type === SHOW_INFO_BANNER) {
    newState = true;
  } else if (type === HIDE_INFO_BANNER) {
    newState = false;
  }
  return newState;
};
