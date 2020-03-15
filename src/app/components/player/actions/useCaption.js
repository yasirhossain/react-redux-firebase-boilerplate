import { USE_CAPTION } from './types';

export const playerInternalUseCaptionAction = index => ({
  type: USE_CAPTION,
  payload: { index },
});
