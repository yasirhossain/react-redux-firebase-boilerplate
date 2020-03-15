import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { withPlayer } from '../PlayerContext';
import { Settings } from './settings';
import Seeker from './Seeker';
import PlayToggle from './PlayToggle';
import Volume from './Volume';
import { Fullscreen, ExitFullscreen, Rewind30, Forward30, Play, ExpandPlayer, CollapsePlayer } from './buttons';
import s from './style/VideoControls';
import { Share } from './share';
import CCToggle from './CCToggle';

const styles = {
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    '& button': {
      pointerEvents: 'none',
    },
  },
};

class VODVideoControlsComponent extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    nowPlaying: PropTypes.shape({}).isRequired,
    player: PropTypes.shape({
      duration: PropTypes.number.isRequired,
      position: PropTypes.number.isRequired,
      seek: PropTypes.func.isRequired,
      unfreezeOverlay: PropTypes.func.isRequired,
    }).isRequired,
    playerIsFullscreen: PropTypes.bool.isRequired,
    showVideoControls: PropTypes.bool.isRequired,
    toggleCaption: PropTypes.func.isRequired,
    enterFullscreen: PropTypes.func.isRequired,
    exitFullscreen: PropTypes.func.isRequired,
    captionIndex: PropTypes.number.isRequired,
    haveCaptions: PropTypes.bool.isRequired,
    showReset: PropTypes.bool.isRequired,
    onCCSettingsChange: PropTypes.func.isRequired,
    resetCCSettings: PropTypes.func.isRequired,
    isMuted: PropTypes.bool.isRequired,
    onCCMenuOpen: PropTypes.func.isRequired,
    onCCMenuClose: PropTypes.func.isRequired,
    onCCSubmenuOpen: PropTypes.func.isRequired,
    onCCSetIndex: PropTypes.func.isRequired,
    isCCMenuOpen: PropTypes.bool.isRequired,
    currentCCMenu: PropTypes.instanceOf(Array).isRequired,
    currentCCMenuName: PropTypes.string.isRequired,
    ccMenuSelectedIndexes: PropTypes.instanceOf(Array).isRequired,
  };

  rewind30 = () => {
    const newPosition = Math.max(this.props.player.position - 30, 0);
    this.props.player.seek(newPosition);
  };

  fastForward30 = () => {
    const newPosition = Math.min(this.props.player.position + 30, this.props.player.duration);
    this.props.player.seek(newPosition);
  };

  unfreezeOverlay = () => {
    setTimeout(() => this.props.player.unfreezeOverlay());
  };

  exitFullScreen = () => {
    const { player, exitFullscreen } = this.props;
    exitFullscreen();
    player.exitFullscreen();
  };

  render() {
    const {
      classes,
      nowPlaying,
      player,
      playerIsFullscreen,
      showVideoControls,
      haveCaptions,
      isMuted,
      enterFullscreen,
      captionIndex,
      toggleCaption,
      showReset,
      onCCSettingsChange,
      resetCCSettings,
      onCCMenuOpen,
      onCCMenuClose,
      onCCSubmenuOpen,
      onCCSetIndex,
      isCCMenuOpen,
      currentCCMenu,
      currentCCMenuName,
      ccMenuSelectedIndexes,
    } = this.props;
    const disabledClassName = classNames({ [classes.disabled]: !showVideoControls });

    /* eslint-disable jsx-a11y/click-events-have-key-events */
    return (
      <s.videoControls>
        <s.middleControls>
          {player.autoPlayBlocked && <Play onClick={player.play} />}
        </s.middleControls>
        <s.bottomPanel
          playerIsFullscreen={playerIsFullscreen}
          onClick={e => e.stopPropagation()}
        >
          <div className={disabledClassName} >
            <Seeker
              isVOD
              playerIsFullscreen={playerIsFullscreen}
              duration={player.duration}
              position={player.position}
              onSeek={player.seek}
            />
          </div>
          <s.bottomControls playerIsFullscreen={playerIsFullscreen}>
            <s.bottomControlsLeft>
              <Volume
                isMuted={isMuted}
                volume={player.volume}
                mute={player.mute}
                unMute={player.unMute}
                setVolume={player.setVolume}
              />
              <s.bottomControlsLeft>
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
            </s.bottomControlsLeft>

            <s.bottomControlsMiddle
              className={disabledClassName}
            >
              <Rewind30 onClick={this.rewind30} />
              <PlayToggle
                isPlaying={player.isPlaying}
                play={player.play}
                pause={player.pause}
              />
              <Forward30 onClick={this.fastForward30} />
            </s.bottomControlsMiddle>

            <s.bottomControlsRight>
              <Share nowPlaying={nowPlaying} />
              {!playerIsFullscreen && <ExpandPlayer onClick={enterFullscreen} />}
              {playerIsFullscreen && <CollapsePlayer onClick={this.exitFullScreen} />}
              {!player.isFullscreen && <Fullscreen onClick={player.fullscreen} />}
              {player.isFullscreen && <ExitFullscreen onClick={player.exitFullscreen} />}
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
    /* eslint-enable jsx-a11y/click-events-have-key-events */
  }
}

export const VODVideoControls = withPlayer(withStyles(styles)(VODVideoControlsComponent));
