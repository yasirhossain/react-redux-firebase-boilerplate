import PropTypes from 'prop-types';
import React from 'react';
import fscreen from 'fscreen';

let screen;

if (typeof window !== 'undefined') {
  ({ screen } = window);
  screen.lockOrientation = screen.lockOrientation ||
    screen.mozLockOrientation || screen.msLockOrientation;

  screen.unlockOrientation = screen.unlockOrientation || screen.mozUnlockOrientation ||
    screen.msUnlockOrientation || (screen.orientation && screen.orientation.unlock);
}

function lockOrientation(orientation) {
  if (screen.orientation) {
    return screen.orientation.lock(orientation);
  }

  return new Promise((resolve, reject) => {
    const lockedAllowed = screen.lockOrientation(orientation);
    if (lockedAllowed) {
      resolve();
    } else {
      reject();
    }
  });
}

export class FScreenListenerComponent extends React.Component {
  static propTypes = {
    internalEnteredFullscreen: PropTypes.func.isRequired,
    internalExitedFullscreen: PropTypes.func.isRequired,
  };

  componentDidMount() {
    fscreen.addEventListener('fullscreenchange', this.onFullscreenChange);
    fscreen.addEventListener('fullscreenerror', this.onFullscreenError);
  }

  componentWillUnmount() {
    fscreen.removeEventListener('fullscreenchange', this.onFullscreenChange);
    fscreen.removeEventListener('fullscreenerror', this.onFullscreenError);
  }

  onFullscreenError = (e) => {
    console.error(e);
  };

  onFullscreenChange = () => {
    if (fscreen.fullscreenElement !== null) {
      console.log('internalEnteredFullscreen');
      this.props.internalEnteredFullscreen();
      lockOrientation('landscape').catch();
    } else {
      console.log('internalExitedFullscreen');
      this.props.internalExitedFullscreen();
      screen.unlockOrientation();
    }
  };

  render() {
    return null;
  }
}
