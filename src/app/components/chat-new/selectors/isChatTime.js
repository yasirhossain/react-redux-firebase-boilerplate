import { createSelector } from 'reselect';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import startOfMinute from 'date-fns/startOfMinute';
import { chatOrWamEpisodeSelector } from './chatOrWamEpisode';

/**
 * returns true iff:
 * a Chat episode is currently being brodcasted
 * OR will be broadcasted in the next 10 mins
 * OR has been broadcasted in the last 10 mins.
 */
export const chatIsChatTimeSelector = createSelector(
  [
    state => chatOrWamEpisodeSelector(state),
    () => startOfMinute(Date.now()).getTime(),
  ],
  (chatEpisodes, now) => {
    while (chatEpisodes.length > 0) {
      const episode = chatEpisodes[chatEpisodes.length - 1];
      if (isBefore(episode.stop, now)) {
        chatEpisodes.pop();
      } else if (isAfter(episode.start, now) && isBefore(episode.stop, now)) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  },
);
