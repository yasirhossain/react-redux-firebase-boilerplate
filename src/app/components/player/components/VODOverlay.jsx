import React from 'react';
import PropTypes from 'prop-types';
import { VODVideoControls } from './controls/VODVideoControls';
import { withPlayer } from './PlayerContext';
import s from './style/Overlay';
import Poster from '../../vod/components/Poster';

class VODOverlayComponent extends React.Component {
  static propTypes = {
    player: PropTypes.shape({
      overlayFrozen: PropTypes.bool,
      togglePlay: PropTypes.func.isRequired,
    }).isRequired,
    item: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
    itemPosterUrl: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired,
    playerIsFullscreen: PropTypes.bool.isRequired,
    showVideoControls: PropTypes.bool.isRequired,
    toggleCaption: PropTypes.func.isRequired,
    captionIndex: PropTypes.number.isRequired,
    onCCSettingsChange: PropTypes.func.isRequired,
    resetCCSettings: PropTypes.func.isRequired,
    exitFullscreen: PropTypes.func.isRequired,
    enterFullscreen: PropTypes.func.isRequired,
    showReset: PropTypes.bool.isRequired,
    haveCaptions: PropTypes.bool.isRequired,
    isMuted: PropTypes.bool.isRequired,
    onCCMenuOpen: PropTypes.func.isRequired,
    onCCSubmenuOpen: PropTypes.func.isRequired,
    onCCSetIndex: PropTypes.func.isRequired,
    onCCMenuClose: PropTypes.func.isRequired,
    isCCMenuOpen: PropTypes.bool.isRequired,
    currentCCMenu: PropTypes.instanceOf(Array).isRequired,
    currentCCMenuName: PropTypes.string.isRequired,
    ccMenuSelectedIndexes: PropTypes.instanceOf(Array).isRequired,
  };

  onClick = (e) => {
    const isClickingOnWrapper = e.target.tagName === 'DIV';
    const { player, isVisible, playerIsFullscreen } = this.props;
    if (isVisible && !player.overlayFrozen && playerIsFullscreen && isClickingOnWrapper) {
      player.togglePlay();
    }
  };

  render() {
    const {
      item,
      isVisible,
      toggleCaption,
      captionIndex,
      onCCSettingsChange,
      resetCCSettings,
      haveCaptions,
      isMuted,
      playerIsFullscreen,
      exitFullscreen,
      enterFullscreen,
      showVideoControls,
      onCCMenuOpen,
      onCCSubmenuOpen,
      onCCSetIndex,
      isCCMenuOpen,
      currentCCMenu,
      currentCCMenuName,
      ccMenuSelectedIndexes,
      onCCMenuClose,
      itemPosterUrl,
      showReset,
    } = this.props;

    return (
      <s.wrapper onClick={this.onClick}>
        <s.videoControllsWrapper playerIsFullscreen={playerIsFullscreen} visible={isVisible}>
          {playerIsFullscreen ? (
            <s.copyWrapper playerIsFullscreen={playerIsFullscreen}>
              <s.poster>
                <Poster alt={item.name} src={itemPosterUrl} className="poster" />
              </s.poster>
              <s.content>
                <s.title>{item.name}</s.title>
                <s.contentWrapper>
                  <s.rating>{item.rating}</s.rating>
                  <s.episode>{item.name}</s.episode>
                </s.contentWrapper>
              </s.content>
              <s.metadata playerIsFullscreen={playerIsFullscreen} />
            </s.copyWrapper>)
          : (
            <s.copyWrapperMinimized>
              <s.episode>{item.name}</s.episode>
            </s.copyWrapperMinimized>
          )}

          <s.gradient playerIsFullscreen={playerIsFullscreen} />

          <VODVideoControls
            nowPlaying={item}
            playerIsFullscreen={playerIsFullscreen}
            showVideoControls={showVideoControls}
            toggleCaption={toggleCaption}
            onCCSettingsChange={onCCSettingsChange}
            captionIndex={captionIndex}
            resetCCSettings={resetCCSettings}
            haveCaptions={haveCaptions}
            isMuted={isMuted}
            showReset={showReset}
            exitFullscreen={exitFullscreen}
            enterFullscreen={enterFullscreen}
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
  }
}

export const VODOverlay = withPlayer(VODOverlayComponent);
