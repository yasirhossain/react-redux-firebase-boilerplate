import React from 'react';
import PropTypes from 'prop-types';
import { constants } from 'app-webtech-core';
import styled from 'styled-components';
import { withPlayer } from './PlayerContext';
import { ChannelOverlayContainer } from '../containers/ChannelOverlay';
import { VODOverlayContainer } from '../containers/VODOverlay';

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 3;
  cursor: ${props => (props.showCursor ? 'inherit' : 'none')} ;
`;

class PlayerOverlayComponent extends React.Component {
  static propTypes = {
    hideTimeout: PropTypes.number,
    player: PropTypes.shape({
      kind: PropTypes.string,
      overlayFrozen: PropTypes.bool,
    }).isRequired,
    playerIsFullscreen: PropTypes.bool.isRequired,
    onCCSubmenuOpen: PropTypes.func.isRequired,
    onCCOverlayClick: PropTypes.func.isRequired,
    onCCSetIndex: PropTypes.func.isRequired,
    onCCMenuOpen: PropTypes.func.isRequired,
    onCCMenuClose: PropTypes.func.isRequired,
    isCCMenuOpen: PropTypes.bool.isRequired,
    currentCCMenu: PropTypes.instanceOf(Array).isRequired,
    currentCCMenuName: PropTypes.string.isRequired,
    ccMenuSelectedIndexes: PropTypes.instanceOf(Array).isRequired,
  };

  static defaultProps = {
    hideTimeout: 5000,
  };

  state = {
    isVisible: false,
    showCursor: true,
  };

  componentWillReceiveProps(nextProps) {
    // const overlayFrozenChanged = this.props.player.overlayFrozen !== nextProps.player.overlayFrozen;

    // if (overlayFrozenChanged) {
    //   this.setState({ frozen: nextProps.player.overlayFrozen });
    //   if (nextProps.player.overlayFrozen && !this.state.isVisible) {
    //     this.showOverlay();
    //   } else if (this.state.isVisible) {
    //     this.hideOverlay(nextProps.player.overlayFrozen);
    //   }
    // }

    const menuShowChanged = this.props.isCCMenuOpen !== nextProps.isCCMenuOpen;

    // This checks to see if the CC Settings Menu is open to determine if the overlay will be frozen
    if (menuShowChanged) {
      this.setState({ frozen: nextProps.isCCMenuOpen });
      if (nextProps.isCCMenuOpen && !this.state.isVisible) {
        this.showOverlay();
      } else if (this.state.isVisible) {
        this.hideOverlay(nextProps.isCCMenuOpen);
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.hideTimeout);
  }

  onClick = () => {
    this.props.onCCOverlayClick();
    if (!this.state.isVisible) {
      this.showOverlay();
    }
  };

  onFocus = () => {
    if (!this.state.isVisible) {
      this.showOverlay();
    }
  };

  onMouseMove = () => {
    if (!this.state.isVisible) {
      this.showOverlay();
    }
    if (!this.state.showCursor) {
      this.showCursor();
    }
  };

  onMouseLeave = () => {
    if (this.state.isVisible) {
      this.onHideOverlay();
    }
  };

  onHideOverlay() {
    this.hideOverlay(this.state.frozen);
  }

  hideTimeout = null;

  hideOverlay(frozen) {
    // Changed this function in case the state does not change in time for
    // the componentWillReceiveProps function
    if (!frozen) {
      this.setState({ isVisible: false });
      clearTimeout(this.hideTimeout);
    }
  }

  showCursor = () => {
    this.setState({ showCursor: true });
  };

  hideCursor = () => {
    this.setState({ showCursor: false });
  };

  showOverlay() {
    this.setState({ isVisible: true });

    clearTimeout(this.hideTimeout);

    this.hideTimeout = setTimeout(() => {
      if (this.props.player.overlayFrozen) {
        this.setState({ frozen: true });
      } else {
        this.onHideOverlay();
        this.hideCursor();
      }
    }, this.props.hideTimeout);
  }

  render() {
    const {
      player,
      playerIsFullscreen,
      isCCMenuOpen,
      ccMenuSelectedIndexes,
      onCCSubmenuOpen,
      onCCSetIndex,
      onCCMenuOpen,
      onCCMenuClose,
      currentCCMenu,
      currentCCMenuName,
    } = this.props;

    let Overlay;
    if (player.kind) {
      if (player.kind === constants.player.PLAYER_CONTENT_KIND.LINEAR_CHANNEL) {
        Overlay = ChannelOverlayContainer;
      } else if (player.kind === constants.player.PLAYER_CONTENT_KIND.VOD) {
        Overlay = VODOverlayContainer;
      }
    }

    if (Overlay) {
      return (
        <Wrapper
          onClick={this.onClick}
          onFocus={this.onFocus}
          onMouseMove={this.onMouseMove}
          onMouseLeave={this.onMouseLeave}
          showCursor={this.state.showCursor}
        >
          <Overlay
            isVisible={this.state.isVisible}
            playerIsFullscreen={playerIsFullscreen}
            onCCSubmenuOpen={onCCSubmenuOpen}
            onCCMenuOpen={onCCMenuOpen}
            onCCMenuClose={onCCMenuClose}
            onCCSetIndex={onCCSetIndex}
            isCCMenuOpen={isCCMenuOpen}
            currentCCMenu={currentCCMenu}
            currentCCMenuName={currentCCMenuName}
            ccMenuSelectedIndexes={ccMenuSelectedIndexes}
          />
        </Wrapper>
      );
    }

    return null;
  }
}

export const PlayerOverlay = withPlayer(PlayerOverlayComponent);
