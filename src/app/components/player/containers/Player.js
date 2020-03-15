import { connect } from 'react-redux';
import { actions, constants, selectors } from 'app-webtech-core';
import * as chatSelectors from 'app-modules/chat/selectors';
import parse from 'url-parse';
import { PlayerComponent } from '../components/Player';
import {
  enterFullscreen,
  exitFullscreen,
  internalEnteredFullscreen,
  internalExitedFullscreen,
  toggleCaption,
  ccMenuOpen,
  ccMenuClose,
  ccNextSubmenu,
  ccMenuSetIndex,
  ccMenuReset,
} from '../../player/actions';
import { UI_STATES } from '../../ui/reducers';
import { playerContentUrlSelector } from '../selectors/contentUrl';

const PLAYING_STATUSES = [
  constants.player.PLAYER_STATE_STATUSES.PLAYING,
  constants.player.PLAYER_STATE_STATUSES.PAUSED,
];

const mapStateToProps = (state, ownProps) => {
  const player = selectors.player.properties(state);
  const content = selectors.player.content(state);
  const kind = selectors.player.kind(state);
  const page = selectors.location.page(state);
  const { infoBanner } = player;
  const isEpisode = Boolean(infoBanner &&
    infoBanner.vodContent &&
    infoBanner.vodContent.type === constants.vodContent.VOD_CONTENT_TYPE.EPISODE);

  const isChatBarShown = chatSelectors.isVisible(state);

  const url = playerContentUrlSelector(state);

  const isPageTrending = page === 'Trending';

  let featureImageUrl;
  if (infoBanner && infoBanner.channel && infoBanner.channel.featuredImage) {
    const parsedFeaturedImage = parse(infoBanner.channel.featuredImage);
    parsedFeaturedImage.set('query', '?w=800&h=450&fm=jpg&q=75&fit=fill&fill=blur');
    featureImageUrl = parsedFeaturedImage.toString();
  }
  return {
    kind,
    url,
    canTouch: state.ui.canTouch,
    featuredImage: featureImageUrl,
    isEpisode,
    nextEpisode: isEpisode ? selectors.vodContent.nextEpisode(state)(content.id) : null,
    internalFullscreen: state.playerinternal.fullscreen || !ownProps.guideVisible,
    isPlaying: PLAYING_STATUSES.includes(player.status),
    isBuffering: player.status === constants.player.PLAYER_STATE_STATUSES.BUFFERING,
    nowPlaying: player.nowPlaying,
    playerIsFullscreen: player.isFullscreen || state.playerinternal.fullscreen || !ownProps.guideVisible,
    uiControls: state.ui.state === UI_STATES.CONTROLS,
    hasError: player.status === constants.player.PLAYER_STATE_STATUSES.ERROR,
    hidePlayer: (page === 'Vod' && !content) || isPageTrending,
    isPageTrending,
    isChatBarShown,
    isMuted: player.mute,
    isCCMenuOpen: player.isCCMenuOpen,
    currentCCMenu: player.currentCCMenu,
    currentCCMenuName: player.currentCCMenuName,
    ccMenuSelectedIndexes: player.ccMenuSelectedIndexes,
  };
};

const mapDispatchToProps = {
  clearError: actions.player.clearError,
  enteredFullscreen: enterFullscreen,
  exitedFullscreen: exitFullscreen,
  ccSubmenuOpened: ccNextSubmenu,
  ccMenuOpened: ccMenuOpen,
  ccMenuClosed: ccMenuClose,
  ccMenuOnReset: ccMenuReset,
  ccSetIndex: ccMenuSetIndex,
  internalEnteredFullscreen,
  internalExitedFullscreen,
  toggleCaption,
  mute: actions.player.mute,
  onBuffer: actions.player.startBuffering,
  onError: actions.player.setError,
  unmute: actions.player.unmute,
  vodPlayItem: actions.vodGuide.playItem,
  volumeChange: actions.player.volumeChange,
  play: actions.player.play,
  pause: actions.player.pause,
  clickPlay: actions.player.clickPlay,
  clickPause: actions.player.clickPause,
  uiLoaded: actions.layout.uiLoaded,
};

export const Player = connect(mapStateToProps, mapDispatchToProps)(PlayerComponent);
