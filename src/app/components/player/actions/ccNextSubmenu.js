import { actions } from 'app-webtech-core';

export const playerInternalCCNextSubmenuThunkAction = () => async (dispatch, getState) => {
  const state = getState();
  await dispatch(actions.player.ccNextSubmenu(state.playerinternal.captionsSettings.showReset));
};
