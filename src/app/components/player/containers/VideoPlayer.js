import { connect } from 'react-redux';
import { actions, constants, selectors } from 'app-webtech-core';
import { ClapprVideoPlayer } from '../components/ClapprVideoPlayer';
import {
  setCaptionList,
  gaHeartBeat,
  gaAdImpression,
  internalSavePlaybackPosition,
} from '../actions';
import { changeUrlSlug as changeChannelUrlSlug } from '../../guide/actions';
import { changeUrlSlug as changeVodUrlSlug } from '../../vod/actions';
import { playerContentUrlSelector } from '../selectors/contentUrl';

const MUTED_SOURCES = ['pmc'];
const MUTED_TYPES = ['embed'];

const startMutedSelector = (state) => {
  const { query } = selectors.location.properties(state);
  return !!(
    query &&
    (
      (query.mute && query.mute.toLowerCase() === 'true') ||
      (query.utm_source && MUTED_SOURCES.includes(query.utm_source.toLowerCase())) ||
      (query.type && MUTED_TYPES.includes(query.type.toLowerCase()))
    )
  );
};

const mapStateToProps = (state) => {
  const content = selectors.player.content(state);
  const { status, mute } = selectors.player.properties(state);

  const url = playerContentUrlSelector(state);

  const { query } = selectors.location.properties(state);
  const startMuted = startMutedSelector(state);
  const isAutoPlay = (query && query.autoplay) ? query.autoplay.toLowerCase() === 'true' : true;
  const kind = content && content.kind;
  const isVod = kind === constants.player.PLAYER_CONTENT_KIND.VOD;

  return ({
    itemId: content ? content.id : '',
    autostartNotAllowed: status === constants.player.PLAYER_STATE_STATUSES.AUTOSTART_NOT_ALLOWED,
    url,
    kind,
    captionInUseIndex: state.playerinternal.captionInUseIndex,
    captionsStyle: state.playerinternal.captionsSettings,
    haveCaptions: !!state.playerinternal.captionList.length,
    isMuted: mute,
    isPlaying: selectors.player.isPlaying(state),
    startMuted,
    isAutoPlay,
    isVod,
    playbackPosition: state.playerinternal.playbackPosition,
  });
};

const mapDispatchToProps = dispatch => ({
  changeChannelUrlSlug: () => dispatch(changeChannelUrlSlug()),
  changeVodUrlSlug: () => dispatch(changeVodUrlSlug()),
  onPlay: () => dispatch(actions.player.play()),
  onPause: () => dispatch(actions.player.pause()),
  onTime: ({ current, total }) =>
    dispatch(actions.player.time({ currentTime: current, duration: total })),
  onAutoStart: () => dispatch(actions.player.play()),
  onAutoStartNotAllowed: () => dispatch(actions.player.autoStartNotAllowed()),
  onResume: () => dispatch(actions.player.play()),
  onBuffer: () => dispatch(actions.player.startBuffering()),
  onCaptionList: list => dispatch(setCaptionList(list)),
  onError: error => dispatch(actions.player.setError(error)),
  mutePlayer: options => dispatch(actions.player.mute(options)),
  savePlaybackPosition: payload => dispatch(internalSavePlaybackPosition(payload)),
  gaHeartBeat: () => dispatch(gaHeartBeat()),
  gaAdImpression: () => dispatch(gaAdImpression()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  onPlay: () => {
    if (ownProps.onPlay) {
      ownProps.onPlay();
    }
    dispatchProps.onPlay();
  },
  onPause: () => {
    if (ownProps.onPause) {
      ownProps.onPause();
    }
    dispatchProps.onPause();
  },
  onTime: ({ current, total }) => {
    if (ownProps.onTime) {
      ownProps.onTime({ duration: total, position: current });
    }
    dispatchProps.onTime({ current, total });
  },
  updateSlug: () => {
    if (stateProps.itemId) {
      if (stateProps.isVod) {
        dispatchProps.changeVodUrlSlug();
      } else {
        dispatchProps.changeChannelUrlSlug();
      }
    }
  },
});

export const VideoPlayer =
  connect(mapStateToProps, mapDispatchToProps, mergeProps)(ClapprVideoPlayer);
