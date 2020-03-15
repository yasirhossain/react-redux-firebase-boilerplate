import { connect } from 'react-redux';
import { actions, selectors } from 'app-webtech-core';
import { loadedData } from 'app-modules/trivia/selectors';
import { ChannelOverlay } from '../components/ChannelOverlay';
import {
  toggleCaption,
  ccSetSetting,
  internalResetCaptionsSettings,
  exitFullscreen,
  enterFullscreen,
} from '../actions';

const mapStateToProps = (state) => {
  const { mute: isMuted } = selectors.player.properties(state);
  const content = selectors.player.content(state);
  const podProperties = selectors.podTrackerAds.properties(state);
  const triviaData = loadedData(state);
  const { captionInUseIndex, captionList } = state.playerinternal;
  return {
    channel: content ? content.raw : {},
    isTrivia: !!triviaData,
    showVideoControls: !podProperties.currentPlayingAd,
    haveCaptions: captionList.length > 0,
    captionIndex: captionInUseIndex,
    isMuted,
  };
};

const mapDispatchToProps = {
  toggleCaption,
  onCCSettingsChange: ccSetSetting,
  resetCCSettings: internalResetCaptionsSettings,
  exitFullscreen,
  enterFullscreen,
  ccMenuClose: actions.player.ccMenuClose,
};

export const ChannelOverlayContainer = connect(mapStateToProps, mapDispatchToProps)(ChannelOverlay);
