import ArrowUpward from '@material-ui/icons/ArrowUpward';
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import { constants } from 'app-webtech-core';
import fscreen from 'fscreen';
import EventListener from 'react-event-listener';
import { ErrorBoundary } from 'app-modules/ui/components/ErrorBoundary';
import { HEADER_HEIGHT } from 'app-modules/base/constants';
import { MAX_BUFFERING_TIME_IN_MS, RETRIES_ON_ERROR, RETRY_RATE_IN_MS } from '../constants/const';
import { UnknownError } from './errors/UnknownError';
import { PlayerContext } from './PlayerContext';
import { PlayerOverlay } from './PlayerOverlay';
import { VideoPlayer } from '../containers/VideoPlayer';
import { LoadingIndicator } from './LoadingIndicator';
import { AssetsFileResolver } from '../../application/containers/AssetsFileResolver';

const ratio = (9 * 100) / 16;

const Wrapper = styled.div.attrs({
  style: props => (props.internalFullscreen || !props.guideVisible ? {
    height: '100%',
  } : {}),
})`
  height: 75vh;
  max-height: 0;
  transition: max-height 0.3s linear;
  width: 100%;
  overflow: hidden;

  @media (min-width: 960px) {
    height: 65vh;
  }

  .wrapper-bg, .control-btn, .channel-info  {
    transition: opacity 0.2s linear;
    opacity: 0;
    &.volume-off {
      opacity: 1;
    }
  }

  ${({ canTouch }) => !canTouch && css`
    &:hover {
      .wrapper-bg, .control-btn {
        opacity: 1;
      }
    }
  `}

  ${({ playerIsFullscreen, isChatBarShown }) => playerIsFullscreen && isChatBarShown && css`
    @media (min-width: 960px) {
      margin-top: calc((35vh - ${HEADER_HEIGHT}px) / 2);
    }
  `}

  ${({ playerIsFullscreen }) => playerIsFullscreen && css`
    margin-top: 0;
    max-height: ${ratio}vw;
    box-shadow: none;
    position: relative;

    &:hover {
      .channel-info {
        opacity: 1;
      }
    }

    ${({ canTouch, uiControls }) => uiControls &&
      (canTouch ? css`
        .control-btn {
          opacity: 1;
        }
        ` : css`
        .control-btn {
          opacity: 0;
        }
      `)}
    `}

  ${({ hidePlayer }) => hidePlayer && css`
    display: none;
  `}
`;

const RatioWrapper = styled.div.attrs({
  style: ({ internalFullscreen }) => (internalFullscreen ? {
    height: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
  } : {}),
})`
  height: ${({ playerIsFullscreen }) => (playerIsFullscreen ? '65vh' : 0)};
  margin: auto;
  max-height: ${ratio}vw;
  box-shadow: ${({ playerIsFullscreen }) => (playerIsFullscreen ? 'none' : '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)')};
  padding-top: ${({ playerIsFullscreen }) => (playerIsFullscreen ? 0 : `${ratio}%`)};
  position: absolute;
  transition: height 0.3s linear, padding-top 0.3s linear;
  width: 100%;

  @media (max-width: 767px) {
    height: ${({ playerIsFullscreen }) => (playerIsFullscreen ? '75vh' : 0)};
  }
`;

const MinimizedOverlay = styled.div`
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  opacity: 0;
  position: absolute;
  top: 0;
  transition: opacity 0.3s linear;
  width: 100%;
  
  @media (max-width: 480px) {
    display: none;
  }
`;

// this animation lasts 2s, so 15% (100 - 85) is 0.3s.
const overlayAnimation = keyframes`
  0% { opacity: 0 }
  25% { opacity: 1 }
  85% { opacity: 1 }
`;

const FixPosition = styled.div`
  background-color: #121212;
  box-shadow: ${({ playerIsFullscreen }) => (playerIsFullscreen ? 'none' : ' 0 2px 4px 0 #000000')};
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: ${({ playerIsFullscreen }) => (playerIsFullscreen ? 0 : '-112%')};
  transition: top 0.3s linear;
  width: 100%;
  border-radius: ${({ playerIsFullscreen }) => (playerIsFullscreen ? 'none' : '4px')};
  box-shadow: ${({ playerIsFullscreen }) => (playerIsFullscreen ? 'none' : '0px 2px 9px 5px rgba(0, 0, 0, 0.45)')};

  .jwplayer {
    background-color: transparent;
    height: 100%;
    max-height: 100%;
    position: static;
  }

  .jw-ie video {
    height: 100% !important;
    margin: 0 !important;
    position: static !important;
    transform: none !important;
    width: 100% !important;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: ${({ playerIsFullscreen }) => (playerIsFullscreen ? '100%' : '62px')};
    top: ${({ playerIsFullscreen }) => (playerIsFullscreen ? 0 : '-62px')};
  }

  ${({ playerIsFullscreen }) => !playerIsFullscreen && css`
    ${MinimizedOverlay} {
      cursor: pointer;
      animation: 2s linear ${overlayAnimation};
    }

    &:hover ${MinimizedOverlay} {
      opacity: 1;
    }
  `};
`;

const ResizableWrapper = styled.div`
  bottom: 10px;
  box-sizing: border-box;
  height: ${({ playerIsFullscreen }) => (playerIsFullscreen ? '100%' : '0')};
  position: absolute;
  right: ${({ playerIsFullscreen }) => (playerIsFullscreen ? 0 : '54px')};
  transition: none 0.3s linear;
  transition-property: bottom, height, right, width;
  width: 100%;
  z-index: 25;

  ${({ playerIsFullscreen }) => !playerIsFullscreen && css`
    width: 50%;

    @media (min-width: 480px) {
      width: 25%;
    }
    
    @media (max-width: 480px) {
      width: 100%;
      right: 0;
      bottom: 0;
    }
  `}
`;

const Centered = styled.div`
  display: flex;
  height: 100%;
  text-align: center;
  vertical-align: middle;

  > * {
    margin: auto 0;
    flex: 0 0 auto;
    &:first-child {
      margin-left: auto;
    }
    &:last-child {
      margin-right: auto;
    }
  }

  ${({ playerIsFullscreen }) => !playerIsFullscreen && css`
    @media (min-width: 480px) {
      display: none;
    }
  `}
`;

const Circle = styled.span`
  background: #000;
  border-radius: 50%;
  display: inline-block;
  height: 2em;
  margin-right: 0.3em;
  width: 2em;
  > svg {
    transform: rotate(-45deg);
    position: relative;
    top: 4px;
  }
`;

const Label = styled.span`
  font-size: 0.6em;
  font-weight: bold;
  height: 1.3em; // IE fix
  color: #fff;
`;

const VideoWrapper = styled.div`
  display: inline-block;
  height: 100%;
  width: 100%;
  /* @-moz-document url-prefix() {
    width: 100%;
  } */
  position: relative;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 480px) {
    width: ${({ playerIsFullscreen }) => (playerIsFullscreen ? '100%' : '110px')};
    left: 0;
    transform: translate(0);
  }
`;

const SizeHelper = styled(AssetsFileResolver)`
  display: block;
  height: 100%;
  width: auto;
  visibility: hidden;
`;

const VideoInner = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export class PlayerComponent extends React.Component {
  static propTypes = {
    clearError: PropTypes.func.isRequired,
    enteredFullscreen: PropTypes.func.isRequired,
    exitedFullscreen: PropTypes.func.isRequired,
    ccSubmenuOpened: PropTypes.func.isRequired,
    ccMenuOnReset: PropTypes.func.isRequired,
    ccSetIndex: PropTypes.func.isRequired,
    ccMenuOpened: PropTypes.func.isRequired,
    ccMenuClosed: PropTypes.func.isRequired,
    featuredImage: PropTypes.string,
    hasError: PropTypes.bool.isRequired,
    hidePlayer: PropTypes.bool.isRequired,
    internalEnteredFullscreen: PropTypes.func.isRequired,
    internalExitedFullscreen: PropTypes.func.isRequired,
    isBuffering: PropTypes.bool.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    isChatBarShown: PropTypes.bool.isRequired,
    isPageTrending: PropTypes.bool.isRequired,
    guideVisible: PropTypes.bool.isRequired,
    kind: PropTypes.string,
    mute: PropTypes.func.isRequired,
    nowPlaying: PropTypes.shape({}),
    onBuffer: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    onFullscreen: PropTypes.func,
    unmute: PropTypes.func.isRequired,
    url: PropTypes.string,
    isEpisode: PropTypes.bool.isRequired,
    nextEpisode: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
    vodPlayItem: PropTypes.func.isRequired,
    volumeChange: PropTypes.func.isRequired,
    clickPlay: PropTypes.func.isRequired,
    clickPause: PropTypes.func.isRequired,
    uiLoaded: PropTypes.func.isRequired,
    isMuted: PropTypes.bool.isRequired,
    isCCMenuOpen: PropTypes.bool.isRequired,
    currentCCMenu: PropTypes.instanceOf(Array).isRequired,
    currentCCMenuName: PropTypes.string.isRequired,
    ccMenuSelectedIndexes: PropTypes.instanceOf(Array).isRequired,
  };

  static defaultProps = {
    featuredImage: null,
    kind: null,
    nowPlaying: {},
    onFullscreen: null,
    url: null,
    nextEpisode: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      playerContext: this.createPlayerContext(props),
      volumeBeforeMute: null,
    };
  }

  containerRef = React.createRef();

  bufferingTimeout = null;
  errorCount = 0;

  componentDidMount() {
    this.props.uiLoaded();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isBuffering !== this.props.isBuffering) {
      if (nextProps.isBuffering) {
        // Too much time buffering. Let's reload
        this.bufferingTimeout = setTimeout(this.retryPlay, MAX_BUFFERING_TIME_IN_MS);
      } else if (this.bufferingTimeout) {
        clearTimeout(this.bufferingTimeout);
        this.bufferingTimeout = null;
      }
    }
    if (nextProps.isPageTrending !== this.props.isPageTrending) {
      const isVod = nextProps.kind === constants.player.PLAYER_CONTENT_KIND.VOD;
      if (nextProps.isPageTrending) {
        if (isVod) {
          this.pause();
        }
        this.mute();
      } else {
        if (isVod) {
          this.play();
        }
        this.unMute();
      }
    }

    this.updateContext({
      kind: nextProps.kind,
      docked: !nextProps.playerIsFullscreen,
    });
  }

  onBuffer = (e) => {
    this.updateContext({
      playerState: 'buffering',
    });

    if (this.props.onBuffer) {
      this.props.onBuffer(e);
    }
  }

  onBufferChange = ({ duration }) => {
    if (duration !== this.state.playerContext.duration) {
      this.updateContext({
        duration,
      });
    }
  }

  onPause = () => {
    this.updateContext({
      playerState: 'paused',
    });
  }

  onPlay = () => {
    this.updateContext({
      playerState: 'playing',
      autoPlayBlocked: false,
      overlayFrozen: false,
    });
  }

  onPlayerDestroy = () => {
    this.removeListeners(this.player, this.playerEvents);
    this.player = null;
  }

  onPlayerReady = (player, Events) => {
    this.player = player;
    this.playerEvents = Events;
    this.setState({
      playerContext: this.createPlayerContext(this.props, player),
    });

    this.addListeners(player, Events);
  }

  onPlayerComplete = () => {
    if (this.props.isEpisode && this.props.nextEpisode) {
      // eslint-disable-next-line no-underscore-dangle
      this.props.vodPlayItem(this.props.nextEpisode._id);
    }
  }

  onIdle = () => {
    this.updateContext({
      playerState: 'idle',
    });
  }

  onTime = ({ duration, position } = {}) => {
    this.updateContext({
      duration,
      position,
    });
  }

  onMute = ({ mute } = {}) => {
    this.updateContext({
      isMuted: mute,
    });
  }

  onFullscreen = ({ fullscreen } = {}) => {
    this.updateContext({
      isFullscreen: fullscreen,
    });
    if (this.props.onFullscreen) {
      this.props.onFullscreen(fullscreen);
    }
    if (fullscreen) {
      this.props.internalEnteredFullscreen();
    } else {
      this.props.internalExitedFullscreen();
    }
  }

  onFullscreenChange = () => {
    if (fscreen.fullscreenElement !== null) {
      this.onFullscreen({ fullscreen: true });

      this.setState({
        previousPlayerIsFullscreen: this.props.playerIsFullscreen,
      });

      if (!this.props.playerIsFullscreen) {
        this.props.enteredFullscreen();
      }
    } else {
      this.onFullscreen({ fullscreen: false });

      if (!this.state.previousPlayerIsFullscreen) {
        this.props.exitedFullscreen();
      }
    }
  }


  // when a submenu item is clicked to open the next submenu
  onCCSubmenuOpen = () => {
    this.props.ccSubmenuOpened();
  }

  // called for when the menu items are hovered on to set the index
  onCCSetIndex = (index) => {
    this.props.ccSetIndex(index);
  }

  // If the overlay is clicked then it resets the CC settings menu
  onCCOverlayClick = () => {
    this.props.ccMenuOnReset();
  }

  // when the cc settings button is clicked
  onCCMenuOpen = () => {
    this.props.ccMenuOpened();
  }

  onCCMenuClose = () => {
    this.props.ccMenuClosed();
  }

  getErrorComponent = () => <UnknownError retry={this.retryPlay} />

  onAutoPlayBlocked = (player, Events) => {
    if (!this.player) {
      this.player = player;
      this.playerEvents = Events;
    }

    this.updateContext({
      autoPlayBlocked: true,
      overlayFrozen: true,
    });
  }

  setVolume = (volume) => {
    this.volumeChange(volume);
    if (this.player) {
      this.player.setVolume(volume);
    }
    this.updateContext({
      volume,
    });
  }

  play = () => {
    this.props.clickPlay();
    if (this.player) {
      this.player.play();
    }
  }

  pause = () => {
    this.props.clickPause();
    if (this.player) {
      this.player.pause();
    }
  }

  togglePlay = () => {
    if (this.player) {
      if (this.state.playerContext.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    }
  }

  seek = (value) => {
    if (this.player) {
      this.player.pause();
      requestAnimationFrame(() => {
        this.player.seek(value);
        this.player.play();
      });
    }
  }

  mute = () => {
    this.setState({ volumeBeforeMute: this.player && this.player.getVolume() });
    if (this.player) {
      this.player.mute();
    }
    this.props.mute();
    this.onMute({ mute: true });
  }

  unMute = () => {
    if (this.player) {
      this.player.unmute();
    }
    this.props.unmute();
    this.onMute({ mute: false });
    if (this.state.volumeBeforeMute) {
      this.setVolume(this.state.volumeBeforeMute);
      this.setState({ volumeBeforeMute: null });
    } else if (this.state.volumeBeforeMute === 0) {
      this.setVolume(100);
      this.setState({ volumeBeforeMute: null });
    }
  }

  volumeChange = (volume) => {
    const oldVolume = this.player && this.player.getVolume();
    if (oldVolume !== volume) {
      const options = {
        up: volume > oldVolume,
        level: volume,
      };
      this.props.volumeChange(options);
    }
  }

  fullscreen = () => {
    if (this.player) {
      if (fscreen.fullscreenEnabled) {
        fscreen.requestFullscreen(this.containerRef.current);
      }
    }
  }

  exitFullscreen = () => {
    fscreen.exitFullscreen();
  }

  freezeOverlay = () => {
    this.updateContext({
      overlayFrozen: true,
    });
  }

  unfreezeOverlay = () => {
    this.updateContext({
      overlayFrozen: false,
    });
  }

  retryPlay = () => {
    if (this.player) {
      this.props.clearError();

      const { url } = this.props;
      this.player.load({
        file: url,
      });

      this.player.play();
    }
  };

  handleError = (error) => {
    if (
      error.message.indexOf('permission') > -1 ||
      error.message.indexOf('500 Internal Server Error') > -1
    ) {
      console.warn('Not retrying on 403/500 stream error');
      this.props.onError(error);
    } else if (this.errorCount < RETRIES_ON_ERROR) {
      this.props.onBuffer();
      this.errorCount += 1;
      setTimeout(this.retryPlay, RETRY_RATE_IN_MS);
    } else {
      console.warn(`Giving up after ${RETRIES_ON_ERROR} retries`);
      this.props.onError(error);
    }
  };

  createPlayerContext = (props, player) => ({
    kind: props.kind,
    docked: !props.playerIsFullscreen,
    isPlaying: player && player.isPlaying(),
    isMuted: this.props.isMuted,
    isFullscreen: false,
    volume: player && player.getVolume(),
    duration: 0,
    position: 0,
    play: this.play,
    pause: this.pause,
    togglePlay: this.togglePlay,
    seek: this.seek,
    mute: this.mute,
    unMute: this.unMute,
    setVolume: this.setVolume,
    fullscreen: this.fullscreen,
    exitFullscreen: this.exitFullscreen,
    freezeOverlay: this.freezeOverlay,
    unfreezeOverlay: this.unfreezeOverlay,
    containerRef: this.containerRef,
  })

  updateContext = (newContext) => {
    const playerContext = Object.assign({}, this.state.playerContext || {}, newContext);
    playerContext.isPlaying = this.player && this.player.isPlaying();
    playerContext.volume = this.player && this.player.getVolume();

    this.setState({
      playerContext,
    });
  }

  addListeners = (player, Events) => {
    player.on(Events.PLAYER_ERROR, this.handleError);
    player.on('bufferChange', this.onBufferChange);
  }

  removeListeners = (player, Events) => {
    if (player) {
      player.off(Events.PLAYER_ERROR, this.handleError);
      player.off('bufferChange', this.onBufferChange);
    }
  }

  enteredFullscreen = () => {
    if (!this.props.playerIsFullscreen) {
      this.props.enteredFullscreen();
    }
  };

  render() {
    const {
      playerIsFullscreen,
      hasError,
      hidePlayer,
      url,
      featuredImage,
      isCCMenuOpen,
      currentCCMenu,
      currentCCMenuName,
      ccMenuSelectedIndexes,
    } = this.props;

    return (
      <PlayerContext.Provider value={this.state.playerContext}>
        <Wrapper {...this.props} innerRef={this.containerRef}>
          <EventListener
            target={fscreen}
            onFullscreenchange={this.onFullscreenChange}
          />
          <ResizableWrapper {...this.props}>
            <RatioWrapper {...this.props} onClick={this.enteredFullscreen}>
              <FixPosition {...this.props}>
                <LoadingIndicator
                  active={!this.props.isPlaying}
                  featuredImage={this.props.featuredImage}
                />
                <ErrorBoundary
                  error={hasError ? new Error() : null}
                  getErrorComponent={this.getErrorComponent}
                  overlayMode
                >
                  <VideoWrapper playerIsFullscreen={playerIsFullscreen}>
                    {/* Image needed to keep the video proportions right. */}
                    <SizeHelper path="16x9.png" />
                    <VideoInner>
                      {url && <VideoPlayer
                        url={url}
                        hidePlayer={hidePlayer}
                        posterUrl={featuredImage}
                        onComplete={this.onPlayerComplete}
                        onDestroy={this.onPlayerDestroy}
                        onReady={this.onPlayerReady}
                        onTime={this.onTime}
                        onPlay={this.onPlay}
                        onPause={this.onPause}
                        mutePlayer={this.mute}
                        unmutePlayer={this.unMute}
                        onBuffer={this.onBuffer}
                        onAutoPlayBlocked={this.onAutoPlayBlocked}
                      />}
                    </VideoInner>
                  </VideoWrapper>
                  <MinimizedOverlay>
                    <Centered>
                      <Circle>
                        <ArrowUpward style={{ color: '#fff' }} />
                      </Circle>
                      <Label>Expand</Label>
                    </Centered>
                  </MinimizedOverlay>
                  <PlayerOverlay
                    playerIsFullscreen={playerIsFullscreen}
                    isCCMenuOpen={isCCMenuOpen}
                    currentCCMenu={currentCCMenu}
                    currentCCMenuName={currentCCMenuName}
                    ccMenuSelectedIndexes={ccMenuSelectedIndexes}
                    onCCSubmenuOpen={this.onCCSubmenuOpen}
                    onCCOverlayClick={this.onCCOverlayClick}
                    onCCSetIndex={this.onCCSetIndex}
                    onCCMenuOpen={this.onCCMenuOpen}
                    onCCMenuClose={this.onCCMenuClose}
                  />
                </ErrorBoundary>
              </FixPosition>
            </RatioWrapper>
          </ResizableWrapper>
        </Wrapper>
      </PlayerContext.Provider>
    );
  }
}
