import { actions } from 'app-webtech-core';

export const playerInternalCCMenuSetIndexThunkAction = payload => async (dispatch) => {
  await dispatch(actions.player.ccMenuSetIndex(payload));
};
