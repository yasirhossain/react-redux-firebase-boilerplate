import { USE_CAPTION } from '../actions/types';

export const playerInternalCaptionInUseIndexReducer = (previousState = -1, action) => {
  let newState = previousState;
  const { payload: { index = -1 } = {}, type } = action;
  if (type === USE_CAPTION) {
    newState = index;
  }
  return newState;
};
