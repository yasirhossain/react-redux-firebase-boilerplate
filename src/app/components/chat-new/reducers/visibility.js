import { updateState } from 'app-webtech-core/es/reducers/updateState';

export const chatShowReducer = currentState =>
  updateState(
    currentState,
    { isVisible: { $set: true } },
  );

export const chatHideReducer = currentState =>
  updateState(
    currentState,
    { isVisible: { $set: false } },
  );

export const chatVisibilityOverridenReducer = (currentState, action) =>
  updateState(
    currentState,
    { isVisibilityOverriden: { $set: action.payload.enabled } },
  );
