import { playerInternalUseCaptionAction as useCaption } from './useCaption';

export const playerInternalToggleCaptionThunkAction = () => async (dispatch, getState) => {
  const { playerinternal: { captionInUseIndex } } = getState();

  dispatch(useCaption((captionInUseIndex === -1) ? 0 : -1));
};
