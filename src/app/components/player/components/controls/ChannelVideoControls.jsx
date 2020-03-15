import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Volume from './Volume';
import Seeker from './Seeker';
import { Share } from './share';
import Time from './Time';
import CCToggle from './CCToggle';
import { Settings } from './settings';
import { CollapsePlayer, ExitFullscreen, ExpandPlayer, Fullscreen, Play } from './buttons';
import s from './style/VideoControls';
import { withPlayer } from '../PlayerContext';

const styles = {
  disabled: {
    opacity: 0.5,
    pointerEvents: 'none',
  },
};

class ChannelVideoControls extends React.Component {
  static propTypes = {
    channel: PropTypes.shape({}).isRequired,
    hideTimes: PropTypes.bool,
    isTrivia: PropTypes.bool.isRequired,
    nowPlaying: PropTypes.shape({}).isRequired,
    player: PropTypes.shape({
      unfreezeOverlay: PropTypes.func.isRequired,
    }).isRequired,
    playerIsFullscreen: PropTypes.bool.isRequired,
    enterFullscreen: PropTypes.func.isRequired,
    exitFullscreen: PropTypes.func.isRequired,
    haveCaptions: PropTypes.bool.isRequired,
    captionIndex: PropTypes.number.isRequired,
    toggleCaption: PropTypes.func.isRequired,
    showReset: PropTypes.bool.isRequired,
    onCCSettingsChange: PropTypes.func.isRequired,
    resetCCSettings: PropTypes.func.isRequired,
    isMuted: PropTypes.bool.isRequired,
    onCCMenuOpen: PropTypes.func.isRequired,
    onCCMenuClose: PropTypes.func.isRequired,
    onCCSetIndex: PropTypes.func.isRequired,
    onCCSubmenuOpen: PropTypes.func.isRequired,
    isCCMenuOpen: PropTypes.bool.isRequired,
    currentCCMenu: PropTypes.instanceOf(Array).isRequired,
    currentCCMenuName: PropTypes.string.isRequired,
    ccMenuSelectedIndexes: PropTypes.instanceOf(Array).isRequired,
  };

  static defaultProps = {
    hideTimes: false,
  };

  minutesLeft(stop) {
    const dStop = new Date(stop);
    return Math.round((dStop.getTime() - Date.now()) / (1000 * 60));
  }

  unfreezeOverlay = () => {
    setTimeout(() => this.props.player.unfreezeOverlay(), 0);
  };

  exitFullScreen = () => {
    const { player, exitFullscreen } = this.props;
    exitFullscreen();
    player.exitFullscreen();
  };

  render() {
    const {
      channel,
      hideTimes,
      isTrivia,
      nowPlaying,
      player,
      playerIsFullscreen,
      haveCaptions,
      isMuted,
      startShowTime,
      endShowTime,
      elapsed,
      duration,
      enterFullscreen,
      captionIndex,
      toggleCaption,
      showReset,
      onCCSettingsChange,
      resetCCSettings,
      onCCSubmenuOpen,
      onCCSetIndex,
      onCCMenuOpen,
      onCCMenuClose,
      isCCMenuOpen,
      currentCCMenu,
      currentCCMenuName,
      ccMenuSelectedIndexes,
    } = this.props;

    return (
      <s.videoControls>
        <s.middleControls>
          {player.autoPlayBlocked && <Play onClick={player.play} />}
        </s.middleControls>
        <s.bottomPanel playerIsFullscreen={playerIsFullscreen} onClick={e => e.stopPropagation()}>
          {/* TODO: implement hideTimes */}
          {nowPlaying.start &&
            nowPlaying.stop &&
            !Number.isNaN(elapsed) &&
            !Number.isNaN(duration) &&
            (
              <s.seekerWrapper hideTimes={hideTimes}>
                <Seeker
                  playerIsFullscreen={playerIsFullscreen}
                  startShowTime={startShowTime}
                  endShowTime={endShowTime}
                  position={elapsed}
                  duration={duration}
                  passive
                />
              </s.seekerWrapper>
            )}

          <s.bottomControls playerIsFullscreen={playerIsFullscreen}>
            <s.bottomControlsLeft>
              <Volume
                isMuted={isMuted}
                volume={player.volume}
                mute={player.mute}
                unMute={player.unMute}
                setVolume={player.setVolume}
              // onChangeStart={player.freezeOverlay}
              // onChangeEnd={this.unfreezeOverlay}
              />
              <CCToggle
                haveCaptions={haveCaptions}
                captionIndex={captionIndex}
                toggleCaption={toggleCaption}
              />
              {captionIndex === 0 &&
                <Settings
                  onCCSettingsChange={onCCSettingsChange}
                  resetCCSettings={resetCCSettings}
                  onCCMenuOpen={onCCMenuOpen}
                  onCCMenuClose={onCCMenuClose}
                  onCCSubmenuOpen={onCCSubmenuOpen}
                  onCCSetIndex={onCCSetIndex}
                  isCCMenuOpen={isCCMenuOpen}
                  currentCCMenu={currentCCMenu}
                  currentCCMenuName={currentCCMenuName}
                  ccMenuSelectedIndexes={ccMenuSelectedIndexes}
                  showReset={showReset}
                />
              }
            </s.bottomControlsLeft>
            <s.bottomControlsRight>
              <Share channel={channel} isTrivia={isTrivia} nowPlaying={nowPlaying} />
              {!playerIsFullscreen && <ExpandPlayer onClick={enterFullscreen} />}
              {playerIsFullscreen && <CollapsePlayer onClick={this.exitFullScreen} />}
              {!player.isFullscreen && <Fullscreen onClick={player.fullscreen} />}
              {player.isFullscreen && <ExitFullscreen onClick={player.exitFullscreen} />}
              {!hideTimes && <Time duration={duration / 1000} position={elapsed / 1000} />}
            </s.bottomControlsRight>
          </s.bottomControls>
        </s.bottomPanel>
        {!playerIsFullscreen && (
          <s.expandPlayer>
            <ExpandPlayer onClick={this.props.toggleFullscreen} />
          </s.expandPlayer>
        )}
      </s.videoControls>
    );
  }
}

export default withPlayer(withStyles(styles)(ChannelVideoControls));
