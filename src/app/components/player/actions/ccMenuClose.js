import { actions } from 'app-webtech-core';

export const playerInternalCCMenuCloseThunkAction = () => async (dispatch) => {
  await dispatch(actions.player.ccMenuClose());
};
