import { createSelector } from 'reselect';
import { selectors } from 'app-webtech-core';
import { WATCH } from 'app-source/routes/types';
import * as chatSelectors from 'app-modules/chat/selectors';
import { enabledCountryCodes } from '../constants/enabledCountryCodes';
import { subselect } from './root';

const isLocationWatchSelector = (state, props, { location: { type } }) => type.startsWith(WATCH);
const isCountryEnabledSelector = (state, props, globalState) => {
  const { setup: { userCountryCode } = {} } = selectors.application.properties(globalState);
  return enabledCountryCodes.includes(userCountryCode);
};

export const isEnabledSelector = createSelector(
  [
    chat => chat.isConfigured,
    chat => chat.disableChat,
    chat => chat.isVisibilityOverriden,
    isLocationWatchSelector,
    isCountryEnabledSelector,
    (state, props, globalState) => chatSelectors.isChatTime(globalState),
  ],
  (
    isConfigured,
    userDisabledChat,
    isVisibilityOverriden,
    isLocationWatch,
    isCountryEnabled,
    isChatTime,
  ) => {
    if (typeof isVisibilityOverriden === 'boolean') {
      return isVisibilityOverriden;
    }

    return isChatTime && isCountryEnabled && isLocationWatch && isConfigured && !userDisabledChat;
  }
);

export const chatIsEnabledSelector = subselect(isEnabledSelector);
