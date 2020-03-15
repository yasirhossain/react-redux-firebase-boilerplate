import { connect } from 'react-redux';
import { actions, selectors } from 'app-webtech-core';
import { VODOverlay } from '../components/VODOverlay';
import {
  toggleCaption,
  internalChangeCaptionsSettings,
  internalResetCaptionsSettings,
  exitFullscreen,
  enterFullscreen,
} from '../actions';

const mapStateToProps = (state) => {
  const { mute: isMuted } = selectors.player.properties(state);
  const { entities } = selectors.vodContent.properties(state);
  const content = selectors.player.content(state);
  const { captionInUseIndex, captionList } = state.playerinternal;
  const item = content ? content.raw : {};
  let itemPosterUrl = null;

  if (entities &&
    item.serieId &&
    entities.vodContent) {
    itemPosterUrl = entities.vodContent[item.serieId].covers[1].url;
  } else {
    itemPosterUrl = item.covers[0].url;
  }

  return {
    item,
    isPlaying: selectors.player.isPlaying(state),
    showVideoControls: selectors.player.properties(state).showVideoControls,
    haveCaptions: captionList.length > 0,
    captionIndex: captionInUseIndex,
    isMuted,
    itemPosterUrl,
  };
};

const mapDispatchToProps = {
  play: actions.player.play,
  pause: actions.player.pause,
  toggleCaption,
  onCCSettingsChange: internalChangeCaptionsSettings,
  resetCCSettings: internalResetCaptionsSettings,
  exitFullscreen,
  enterFullscreen,
  ccMenuClose: actions.player.ccMenuClose,
};

export const VODOverlayContainer = connect(mapStateToProps, mapDispatchToProps)(VODOverlay);
