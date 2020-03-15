import { SET_CAPTION_LIST } from './types';

export const playerInternalSetCaptionListAction = captionList => ({
  type: SET_CAPTION_LIST,
  payload: { captionList },
});
