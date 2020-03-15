import { updateState } from 'app-webtech-core/es/reducers/updateState';

export const chatAvatarUploadProgressReducer = (currentState, action) =>
  updateState(
    currentState,
    { avatarUploadProgress: { $set: action.payload } },
  );

export const chatClearAvatarUploadProgressReducer = currentState =>
  updateState(
    currentState,
    { avatarUploadProgress: { $set: -1 } },
  );
