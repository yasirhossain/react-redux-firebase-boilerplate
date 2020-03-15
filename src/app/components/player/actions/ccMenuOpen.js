import { actions } from 'app-webtech-core';

export const playerInternalCCMenuOpenThunkAction = () => async (dispatch) => {
  await dispatch(actions.player.ccMenuOpen());
};
