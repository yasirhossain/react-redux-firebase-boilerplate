import { updateState } from 'app-webtech-core/es/reducers/updateState';

export const chatEnableReducer = currentState =>
  updateState(
    currentState,
    { disableChat: { $set: false } },
  );

export const chatDisableReducer = currentState =>
  updateState(
    currentState,
    { disableChat: { $set: true } },
  );
