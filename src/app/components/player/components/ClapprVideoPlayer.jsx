import React, { Component, createRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import debug from 'debug';
import { constants, components } from 'app-webtech-core';
import { Captions } from './Captions';

const logger = debug('web:player:clappr');

const HLS_CONFIG = {
  enableWebVTT: true,
  enableCEA708Captions: true,

  startLevel: 0,
  initialLiveManifestSize: 1,

  levelLoadingTimeOut: 15000,
  levelLoadingMaxRetry: 5,
  levelLoadingRetryDelay: 5000,
  levelLoadingMaxRetryTimeout: 64000,

  manifestLoadingTimeOut: 15000,
  manifestLoadingMaxRetry: 3,
  manifestLoadingRetryDelay: 1000,
  manifestLoadingMaxRetryTimeout: 64000,

  fragLoadingTimeOut: 15000,
  fragLoadingMaxRetry: 3,
  fragLoadingRetryDelay: 1000,
  fragLoadingMaxRetryTimeout: 64000,

  startFragPrefetch: true,

  maxBufferLength: 120,
  nudgeMaxRetry: 5,

  appendErrorMaxRetry: 10,
};
const GA_VOD_HEART_BEAT_FIRE_INTERVAL = 20 * 60 * 1000;

class ClapprVideoPlayer extends Component {
  static propTypes = {
    kind: PropTypes.string,
    url: PropTypes.string.isRequired,
    playbackPosition: PropTypes.shape({}).isRequired,
    itemId: PropTypes.string.isRequired,
    isMuted: PropTypes.bool,
    isVod: PropTypes.bool,
    startMuted: PropTypes.bool,

    onReady: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onPause: PropTypes.func.isRequired,
    onBuffer: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired,
    onTime: PropTypes.func.isRequired,
    onDestroy: PropTypes.func.isRequired,
    onAutoPlayBlocked: PropTypes.func.isRequired,
    mutePlayer: PropTypes.func.isRequired,
    unmutePlayer: PropTypes.func.isRequired,

    updateSlug: PropTypes.func.isRequired,

    gaAdImpression: PropTypes.func.isRequired,
    gaHeartBeat: PropTypes.func.isRequired,
    onCaptionList: PropTypes.func.isRequired,
    savePlaybackPosition: PropTypes.func.isRequired,
  }

  static defaultProps = {
    kind: null,
    isMuted: false,
    isVod: false,
    startMuted: false,
  }

  state = {
    firstPlay: true,
    player: null,
    ready: false,
    tryPlayCount: 0,
  }

  componentDidMount() {
    this.initialize();
    this.props.updateSlug();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const urlChange = this.props.url !== nextProps.url;
    const playerChange = this.state.player !== nextState.player;

    return urlChange || playerChange;
  }

  componentDidUpdate(prevProps) {
    if (this.props.url && this.props.url !== prevProps.url) {
      this.initialize();
      this.props.updateSlug();
    }
  }

  componentWillUnmount() {
    this.tryDestroy();
  }

  onHeartBeat = ({ diff, checkHeartBeat }) => {
    const { isVod, gaHeartBeat } = this.props;
    if (isVod) {
      this.gaVODPlaybackTime += diff;
    }

    const timeInSeconds = Math.round(this.gaVODPlaybackTime / 1000);

    if (checkHeartBeat(
      this.gaVODPlaybackTime,
      GA_VOD_HEART_BEAT_FIRE_INTERVAL,
      timeInSeconds,
      this.lastGAVodEventTime,
    )) {
      gaHeartBeat();
      this.lastGAVodEventTime = timeInSeconds;
    }
  }

  onAdStart = () => {
    this.props.gaAdImpression();
  }

  getStartPosition = () => {
    const { playbackPosition: resumePlayback } = this.props;
    if (resumePlayback.kind === constants.player.PLAYER_CONTENT_KIND.VOD) {
      const sameItem = resumePlayback.itemId === this.props.itemId;

      if (sameItem) {
        const { position, duration } = resumePlayback;

        if (position < duration) return position;
      }
    }

    return -1;
  }

  player;
  destroying = false;
  videoRef = createRef();
  gaVODPlaybackTime = 0; // in ms
  lastGAVodEventTime = 0; // in s

  isMuted = () => {
    if (this.state.firstPlay) {
      return this.props.startMuted || this.props.isMuted;
    }

    return this.props.isMuted;
  }

  initialize = async () => {
    if (!this.videoRef.current) {
      return;
    }
    const { url } = this.props;
    logger('initializing', url);

    this.tryDestroy();

    this.Clappr = await import('clappr').then(module => module.default);

    const player = new this.Clappr.Player({
      parent: this.videoRef.current,
      source: url,
      autoPlay: false,
      chromeless: true,
      width: '100%',
      height: '100%',
      muted: false,
      playback: {
        playInline: true,
        hlsjsConfig: {
          ...HLS_CONFIG,
          startPosition: this.getStartPosition(),
          debug: localStorage.hlsDebug || false,
        },
      },
    });

    const originalPause = player.pause.bind(player);
    const originalPlay = player.play.bind(player);

    player.pause = () => {
      if (this.props.isVod) {
        this.setState({ paused: true });
      }
      originalPause();
    };

    player.play = () => {
      if (this.props.isVod) {
        this.setState({ paused: false });
      }
      originalPlay();
    };

    // Using once(PLAYER_PLAY) until find why PLAYBACK_READY is not working
    player.once(this.Clappr.Events.PLAYER_PLAY, this.handleVideoReady);
    player.on(this.Clappr.Events.PLAYER_PLAY, this.handleVideoPlaying);
    player.on(this.Clappr.Events.PLAYER_PAUSE, this.handleVideoPause);
    player.on(this.Clappr.Events.PLAYER_ENDED, this.handleVideoEnded);
    player.on(this.Clappr.Events.PLAYER_TIMEUPDATE, this.handleVideoTimeUpdate);
    player.on(this.Clappr.Events.PLAYER_ERROR, this.handleVideoError);
    player.listenTo(
      player.core.activeContainer.playback,
      this.Clappr.Events.PLAYBACK_BUFFERING,
      this.handleVideoWaiting,
    );

    this.clearAutoplay();

    this.setState({
      player,
      ready: false,
      readyCheck: 0,
      autoplayBlocked: false,
    }, () => {
      this.tryAutoplay();
    });
  }

  checkReadyTimer;

  checkReady = () => {
    if (this.state.ready) {
      logger('Player ready');
      this.retryOnErrorCount = 0;
      return;
    }

    if (this.checkReadyTimer) {
      clearTimeout(this.checkReadyTimer);
    }

    if (this.state.readyCheck < 25) {
      this.setState({ readyCheck: this.state.readyCheck + 1 });
      this.checkReadyTimer = setTimeout(this.checkReady, 200);
    } else {
      logger('Not ready after a while');

      this.clearAutoplay();
      this.tryAutoplay();
    }
  }

  clearAutoplay = () => {
    this.setState({
      tryMuted: false,
      tryPlayCount: 0,
    });
  }

  tryAutoplay = () => {
    if (!this.state.player) {
      // This should never happen, but if happen, retry after timeout
      setTimeout(() => {
        this.tryAutoplay();
      }, 100);
      return;
    }
    const { player } = this.state;
    logger('checkAutoplay', { isPlaying: player.isPlaying() });
    if (!player.isPlaying()) {
      if (this.state.tryPlayCount === 0) {
        logger('Auto play trying to play for the first time');
        if (this.isMuted()) {
          player.mute();
          this.props.mutePlayer();
        }
        player.play();
        this.setState({ tryPlayCount: 1 });
      } else if (!this.state.tryMuted) {
        logger('Auto play failed, muting and retrying');
        player.mute();
        this.props.mutePlayer();
        this.setState({ tryMuted: true, tryPlayCount: 2 });
        player.play();
      } else {
        logger('Can\'t autoplay');
        this.props.onAutoPlayBlocked(player, this.Clappr.Events);
        this.setState({ autoplayBlocked: true });
        player.unmute();
        this.props.unmutePlayer();
        return;
      }
      setTimeout(this.tryAutoplay, 50);
    } else {
      this.setState({ tryMuted: false, tryPlayCount: 0, readyCheck: 0 });
      this.checkReady();
    }
  }

  checkPlayingTimer;
  startCheckPlaying = () => {
    if (this.checkPlayingTimer) {
      clearInterval(this.checkPlayingTimer);
    }
    logger('Initializing check playing interval');

    this.setState({ checkPlayingCount: 0 });
    this.checkPlayingTimer = setInterval(this.checkPlaying, 1000);
  }

  checkPlaying = () => {
    const {
      player,
      checkPlayingCount,
      autoplayBlocked,
      paused,
    } = this.state;
    if (autoplayBlocked || paused) {
      return;
    }

    if (player.isPlaying()) {
      this.setState({ checkPlayingCount: 0 });
      return;
    }
    logger('Player not is playing');

    logger(`Play check count: ${checkPlayingCount}`);
    if (checkPlayingCount > 20) {
      logger('Cannot play, reinitializing player');
      this.initialize();
      return;
    }

    player.play();
    this.setState({ checkPlayingCount: checkPlayingCount + 1 });
  }

  tryDestroy = () => {
    if (this.state.player) {
      this.destroying = true;
      this.state.player.destroy();
      this.state.player = undefined;
      if (this.props.onDestroy) {
        this.props.onDestroy();
      }
    }
  }

  setCaptions = (e) => {
    const tracks = this.state.player.core.activeContainer.playback.closedCaptionsTracks;
    logger('tracks found: %O, event: %o', tracks, e);
    tracks.forEach(({ track }) => {
      track.mode = 'hidden';
    });
    this.props.onCaptionList(tracks);
  }

  configureCaptions = () => {
    const htmlPlayerElement = this.state.player.core.activeContainer.playback.$el[0];
    if (htmlPlayerElement && htmlPlayerElement.textTracks) {
      logger('configuring captions');
      htmlPlayerElement.textTracks.addEventListener('addtrack', this.setCaptions);
      htmlPlayerElement.textTracks.addEventListener('removetrack', this.setCaptions);
      this.setCaptions();
    }
  }

  handleVideoReady = () => {
    logger('Video Ready');
    this.configureCaptions();
    const { player } = this.state;
    this.props.onReady(player, this.Clappr.Events);
    this.setState({
      ready: true,
      firstPlay: false,
    });
    this.destroying = false;

    if (player.core.activeContainer.playback._hls) {
      player.core.activeContainer.playback._hls
        .on(this.Clappr.HLS.HLSJS.Events.DESTROYING, this.handleDestroying);
    }

    this.startCheckPlaying();
  }

  handleDestroying = () => {
    if (!this.destroying) {
      logger('Destroyed, reinitializing');
      this.initialize();
    }
  }

  handleVideoPlaying = () => {
    logger('Video Playing');
    this.props.onPlay();
  }

  handleVideoPause = () => {
    const { player } = this.state;
    logger('Video Paused');
    if (player && player.buffering) {
      this.props.onBuffer();
    } else {
      this.props.onPause();
    }
  }

  handleVideoWaiting = () => {
    this.props.onBuffer();
  }

  handleVideoEnded = () => {
    if (this.props.isVod) {
      this.tryDestroy();
      this.props.onComplete();
    } else {
      // This is here because services insert #EXT-X-ENDLIST
      // which is a false ending. We need to skip over it and
      // continue to play the same stream.
      this.initialize();
    }
  }

  handleVideoTimeUpdate = throttle((e) => {
    const {
      kind,
      onTime,
      itemId,
      savePlaybackPosition,
    } = this.props;

    savePlaybackPosition({
      itemId,
      kind,
      position: Math.floor(e.current),
      duration: e.total,
    });
    onTime(e);
  }, 500, { trailing: true })

  retryWait = 5000;
  retryOnErrorCount = 0;
  throttledRetry = throttle(() => {
    console.warn('retrying now');
    this.initialize();
    this.retryOnErrorCount += 1;
  }, this.retryWait)
  handleVideoError = () => {
    if (this.retryOnErrorCount <= 10) {
      console.warn('video error, will retry soon');
      this.throttledRetry();
    } else {
      console.error('Giving up to retry on error');
    }
  }

  render() {
    return (
      <Fragment>
        <div
          style={{ width: '100%', height: '100%' }}
          ref={this.videoRef}
        />
        {this.state.player && (
          <Fragment>
            <Captions />
            <components.PodTrackerAds
              key="coreAdsTracker"
              playerInstance={this.state.player}
              onAdStart={this.onAdStart}
              playerEventsList={this.Clappr.Events}
            />
            <components.Player
              key="corePlayer"
              playerInstance={this.state.player}
              onHeartBeat={this.onHeartBeat}
              playerEventsList={this.Clappr.Events}
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export { ClapprVideoPlayer };
