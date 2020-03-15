import { SET_CAPTION_LIST } from '../actions/types';

export const playerInternalCaptionListReducer = (previousState = [], action) => {
  let newState = previousState;
  const { payload: { captionList = [] } = {}, type } = action;
  if (type === SET_CAPTION_LIST) {
    newState = [...captionList];
  }
  return newState;
};
