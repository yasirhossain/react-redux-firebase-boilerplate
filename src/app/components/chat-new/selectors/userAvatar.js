import { createSelector } from 'reselect';
import { randomAvatarGenerator } from '../helpers/avatarGenerator';
import { subselect } from './root';

const userAvatarSelector = createSelector(
  [
    chat => chat.avatarUrl,
    (state, props, globalState) => globalState.userAccount.socialAvatar,
  ],
  (chatAvatar, socialAvatar) => chatAvatar || socialAvatar || randomAvatarGenerator(),
);

export const chatUserAvatarSelector = subselect(userAvatarSelector);
