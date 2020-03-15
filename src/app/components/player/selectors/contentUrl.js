import { createSelector } from 'reselect';
import { selectors } from 'app-webtech-core';

export const playerContentUrlSelector = createSelector(
  [selectors.player.content],
  (content) => {
    let finalUrl;

    if (content) {
      finalUrl = content.url;

      if (finalUrl) {
        // Adding serverSideAds to player content url
        if (!finalUrl.includes('serverSideAds=')) {
          const divider = finalUrl.includes('?') ? '&' : '?';
          finalUrl = `${finalUrl}${divider}serverSideAds=true`;
        }
      }
    }

    return finalUrl;
  },
);
