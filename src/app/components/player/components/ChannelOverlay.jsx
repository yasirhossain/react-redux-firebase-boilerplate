import PropTypes from 'prop-types';
import React from 'react';
import { getCurrentShow } from './../../../utils';
import { withPlayer } from './PlayerContext';
import ChannelVideoControls from './controls/ChannelVideoControls';
import Time from './controls/Time';
import s from './style/Overlay';

const ChannelOverlayComponent = ({
  channel,
  isTrivia,
  isVisible,
  showVideoControls,
  toggleCaption,
  captionIndex,
  onCCSettingsChange,
  resetCCSettings,
  haveCaptions,
  isMuted,
  player,
  showReset,
  playerIsFullscreen,
  exitFullscreen,
  enterFullscreen,
  onCCMenuOpen,
  onCCMenuClose,
  onCCSubmenuOpen,
  onCCSetIndex,
  isCCMenuOpen,
  currentCCMenu,
  currentCCMenuName,
  ccMenuSelectedIndexes,
  ccMenuClose,
}) => {
  const nowPlaying = getCurrentShow(channel);
  const episode = nowPlaying && nowPlaying.episode;

  const doubleDigits = num => (num > 9 ? num : `0${num}`);
  const getElapsed = start => (Date.now() - new Date(start).getTime());
  const convertTime = (stop) => {
    const hours = stop.getHours() % 12;
    const minutes = doubleDigits(stop.getMinutes());
    const ampm = stop.getHours() < 12 ? 'AM' : 'PM';
    return `${hours}:${minutes}${ampm}`;
  };

  const startShowTime = convertTime(new Date(nowPlaying.start));
  const endShowTime = convertTime(new Date(nowPlaying.stop));
  const duration = new Date(nowPlaying.stop).getTime() - new Date(nowPlaying.start).getTime();
  const elapsed = getElapsed(nowPlaying.start);

  return (
    <s.wrapper>
      <s.videoControllsWrapper playerIsFullscreen={playerIsFullscreen} visible={isVisible}>

        {!player.autoPlayBlocked && playerIsFullscreen &&
          <s.copyWrapper playerIsFullscreen={playerIsFullscreen}>
            <s.channelLogo>
              <img src={channel.logo} alt={channel.name} />
            </s.channelLogo>
            <s.content>
              <s.title>{episode.name}</s.title>
              <s.contentWrapper>
                <s.rating>{episode.rating}</s.rating>
                <s.episode>{episode.name}</s.episode>
              </s.contentWrapper>
            </s.content>
          </s.copyWrapper>
        }

        {!playerIsFullscreen && (
          <s.copyWrapperMinimized>
            <s.episode>{episode.name}</s.episode>
            <Time
              playerIsFullscreen={playerIsFullscreen}
              startShowTime={startShowTime}
              endShowTime={endShowTime}
              duration={duration}
              position={elapsed}
            />
          </s.copyWrapperMinimized>
        )}

        <s.gradient playerIsFullscreen={playerIsFullscreen} />

        <ChannelVideoControls
          player={player}
          channel={channel}
          hideTimes
          isMuted={isMuted}
          isTrivia={isTrivia}
          nowPlaying={nowPlaying}
          haveCaptions={haveCaptions}
          playerIsFullscreen={playerIsFullscreen}
          showVideoControls={showVideoControls}
          toggleCaption={toggleCaption}
          onCCSettingsChange={onCCSettingsChange}
          captionIndex={captionIndex}
          resetCCSettings={resetCCSettings}
          showReset={showReset}
          exitFullscreen={exitFullscreen}
          enterFullscreen={enterFullscreen}
          episode={episode}
          startShowTime={startShowTime}
          endShowTime={endShowTime}
          duration={duration}
          elapsed={elapsed}
          onCCMenuOpen={onCCMenuOpen}
          onCCMenuClose={onCCMenuClose}
          onCCSubmenuOpen={onCCSubmenuOpen}
          onCCSetIndex={onCCSetIndex}
          isCCMenuOpen={isCCMenuOpen}
          currentCCMenu={currentCCMenu}
          currentCCMenuName={currentCCMenuName}
          ccMenuSelectedIndexes={ccMenuSelectedIndexes}
        />
      </s.videoControllsWrapper>
    </s.wrapper>
  );
};

ChannelOverlayComponent.propTypes = {
  channel: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  isTrivia: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  playerIsFullscreen: PropTypes.bool.isRequired,
  onCCMenuOpen: PropTypes.func.isRequired,
  onCCMenuClose: PropTypes.func.isRequired,
  onCCSubmenuOpen: PropTypes.func.isRequired,
  onCCSetIndex: PropTypes.func.isRequired,
  isCCMenuOpen: PropTypes.bool.isRequired,
  currentCCMenu: PropTypes.instanceOf(Array).isRequired,
  currentCCMenuName: PropTypes.string.isRequired,
  ccMenuSelectedIndexes: PropTypes.instanceOf(Array).isRequired,
  showVideoControls: PropTypes.bool.isRequired,
  toggleCaption: PropTypes.func.isRequired,
  captionIndex: PropTypes.number.isRequired,
  onCCSettingsChange: PropTypes.func.isRequired,
  exitFullscreen: PropTypes.func.isRequired,
  enterFullscreen: PropTypes.func.isRequired,
  resetCCSettings: PropTypes.func.isRequired,
  ccMenuClose: PropTypes.func.isRequired,
  haveCaptions: PropTypes.bool.isRequired,
  isMuted: PropTypes.bool.isRequired,
  showReset: PropTypes.bool.isRequired,
};

export const ChannelOverlay = withPlayer(ChannelOverlayComponent);
