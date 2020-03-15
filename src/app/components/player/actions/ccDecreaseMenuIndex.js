import { actions } from 'app-webtech-core';

export const playerInternalCCDecreaseMenuIndexThunkAction = () => async (dispatch) => {
  await dispatch(actions.player.ccMenuChangeIndex(-1));
};
