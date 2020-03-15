import { selectors } from 'app-webtech-core';
import { createSelector } from 'reselect';
import isAfter from 'date-fns/isAfter';
import compareAsc from 'date-fns/compareAsc';
import subMinutes from 'date-fns/subMinutes';
import addMinutes from 'date-fns/addMinutes';
import {
  CHAT_EPISODE_TITLE, WAM_EPISODE_TITLE,
  ALLOW_CHAT_X_MINS_BEFORE, ALLOW_CHAT_X_MINS_AFTER,
} from 'app-modules/base/constants';


function getChatOrWamEpisodes(channelList) {
  const res = [];
  const now = subMinutes(Date.now(), ALLOW_CHAT_X_MINS_BEFORE);
  channelList.forEach((channel) => {
    if (channel && channel.timelines) {
      const chatTimelines =
        channel.timelines.filter(tmln =>
          (tmln.title.endsWith(CHAT_EPISODE_TITLE) || tmln.title.endsWith(WAM_EPISODE_TITLE))
          && isAfter(tmln.start, now));

      chatTimelines.forEach((tmln) => {
        res.push({
          channelId: channel._id, // eslint-disable-line no-underscore-dangle
          title: tmln.title,
          start: subMinutes(tmln.start, ALLOW_CHAT_X_MINS_BEFORE),
          stop: addMinutes(tmln.stop, ALLOW_CHAT_X_MINS_AFTER),
        });
      });
    }
  });
  res.sort((a, b) => compareAsc(b.start, a.start));
  return res;
}

export const chatOrWamEpisodeSelector = createSelector(
  state => selectors.linearChannels.channelList(state),
  channelList => getChatOrWamEpisodes(channelList),
);

