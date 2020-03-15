import { actions } from 'app-webtech-core';

export const playerInternalCCPrevSubmenuThunkAction = () => async (dispatch, getState) => {
  const state = getState();
  await dispatch(actions.player.ccPrevSubmenu(state.playerinternal.captionsSettings.showReset));
};
