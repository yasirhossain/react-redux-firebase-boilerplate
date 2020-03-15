/* eslint-disable you-dont-need-lodash-underscore/find */
import { actions, selectors, constants } from 'app-webtech-core';
import { redirect } from 'redux-first-router';
import { VOD_MOVIE, VOD_SERIES_SEASON_EPISODE, VOD_SERIES_EPISODE, WATCH_CHANNEL } from 'app-source/routes/types';
import find from 'lodash/find';
import { playerInternalShowInfoBannerThunkAction as showInfoBanner } from './showInfoBanner';

export const playerInternalEnterFullscreenThunkAction = () => async (dispatch, getState) => {
  const { content } = selectors.player.properties(getState());
  const vodContents = selectors.vodContent.properties(getState());
  if (content.kind === constants.player.PLAYER_CONTENT_KIND.VOD) {
    const matchedItem = find(vodContents.entities.vodContent, { _id: content.id });
    if (matchedItem.type === 'movie') {
      await dispatch(redirect({ type: VOD_MOVIE, payload: { movieSlug: content.slug } }));
    } else if (matchedItem.type === 'series') {
      await dispatch(redirect({ type: VOD_SERIES_EPISODE, payload: { seriesSlug: matchedItem.serieSlug, episodeSlug: matchedItem.slug } }));
    } else if (matchedItem.type === 'episode') {
      await dispatch(redirect({ type: VOD_SERIES_SEASON_EPISODE, payload: { seriesSlug: matchedItem.serieSlug, seasonNumber: matchedItem.season, episodeSlug: matchedItem.slug } }));
    }
  } else if (content.kind === constants.player.PLAYER_CONTENT_KIND.LINEAR_CHANNEL) {
    await dispatch(redirect({ type: WATCH_CHANNEL, payload: { slug: content.slug } }));
  }

  await dispatch(actions.player.enteredFullscreen());
  const { currentPlayingIndex } = selectors.guide.properties(getState());
  await dispatch(actions.guide.changeSelectedIndex({ newIndex: currentPlayingIndex }));
  await dispatch(actions.player.setInfoBanner(content));
  await dispatch(showInfoBanner());
};
