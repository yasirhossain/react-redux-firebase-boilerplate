// Modules
import { CHANGE_CAPTIONS_SETTINGS } from './types';

export const playerInternalChangeCationsSettingsAction = (name, value) => ({
  type: CHANGE_CAPTIONS_SETTINGS,
  payload: { [name]: value },
});
