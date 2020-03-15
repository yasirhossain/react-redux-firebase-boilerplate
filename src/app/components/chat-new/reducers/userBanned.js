import { updateState } from 'app-webtech-core/es/reducers/updateState';

export const chatUserBannedReducer = (currentState, action) =>
  updateState(
    currentState,
    { isBanned: { $set: action.payload } },
  );
