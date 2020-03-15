import { playerInternalChangeCationsSettingsAction as changeSettings } from './changeCaptionsSettings';
import { ccMenuReset } from '../actions';

export const playerInternalSetCCSettingThunkAction = (name, value) => async (dispatch) => {
  dispatch(ccMenuReset());
  await dispatch(changeSettings(name, value));
};
