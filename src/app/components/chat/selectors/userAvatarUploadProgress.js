import { createSelector } from 'reselect';
import { subselect } from './root';

const userAvatarUploadProgressSelector = createSelector(
  chat => chat.avatarUploadProgress,
  progress => progress,
);

export const chatUserAvatarUploadProgressSelector = subselect(userAvatarUploadProgressSelector);
