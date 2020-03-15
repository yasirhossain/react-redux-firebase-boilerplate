import { actions } from 'app-webtech-core';

export const playerInternalCCMenuResetThunkAction = () => async (dispatch) => {
  await dispatch(actions.player.ccMenuReset());
};
