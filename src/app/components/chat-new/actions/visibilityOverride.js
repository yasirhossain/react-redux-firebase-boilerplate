import { VISIBILITY_OVERRIDEN } from './types';
import { chatHideThunkAction, chatShowThunkAction } from './visibility';
import { chatEnableAction } from './enable';
import { chatDisableAction } from './disable';

// This action is dispatched by firebase whenever /live-override/enable changes
// It only change the disableChat locally for the user

export const chatVisibilityOverrideThunkAction = enabled =>
  (dispatch) => {
    if (enabled) {
      dispatch(chatShowThunkAction());
      dispatch(chatEnableAction());
    } else {
      dispatch(chatHideThunkAction());
      dispatch(chatDisableAction());
    }

    return dispatch({ type: VISIBILITY_OVERRIDEN, payload: { enabled } });
  };
