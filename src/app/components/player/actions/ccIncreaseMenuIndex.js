import { actions } from 'app-webtech-core';

export const playerInternalCCIncreaseMenuIndexThunkAction = () => async (dispatch) => {
  await dispatch(actions.player.ccMenuChangeIndex(1));
};
