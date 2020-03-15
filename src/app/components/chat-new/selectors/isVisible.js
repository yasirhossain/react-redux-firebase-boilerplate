import { selectors } from 'app-webtech-core';
import { createSelector } from 'reselect';
import { subselect } from './root';
import { isEnabledSelector } from './isEnabled';

const pageSelector = (state, props, globalState) => selectors.location.page(globalState);

const isVisibleSelector = createSelector(
  [
    chat => chat.isVisible,
    isEnabledSelector,
    pageSelector,
  ],
  (isVisible, isEnabled, page) => isVisible && isEnabled && page === 'Watch',
);

export const chatIsVisibleSelector = subselect(isVisibleSelector);
