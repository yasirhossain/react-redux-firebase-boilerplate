import { createSelector } from 'reselect';
import { subselect } from './root';

const userAvatarFilePathSelector = createSelector(
  chat => chat.avatarFilePath,
  avatarFilePath => avatarFilePath,
);

export const chatUserAvatarFilePathSelector = subselect(userAvatarFilePathSelector);
