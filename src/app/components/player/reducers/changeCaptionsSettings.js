// Modules
import { CHANGE_CAPTIONS_SETTINGS, RESET_CAPTIONS_SETTINGS } from '../actions/types';

const defaultState = {
  backgroundColor: '#000',
  backgroundOpacity: 75,
  color: '#FFF',
  fontFamily: 'sans-serif',
  fontOpacity: 75,
  fontSize: 20,
  showReset: false,
};

export const playerInternalChangeCaptionsSettingsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_CAPTIONS_SETTINGS:
      return {
        ...state,
        ...action.payload,
        showReset: true,
      };
    case RESET_CAPTIONS_SETTINGS:
      return defaultState;
    default:
      return state;
  }
};
