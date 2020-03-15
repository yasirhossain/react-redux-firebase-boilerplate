import React from 'react';
import PropTypes from 'prop-types';
import { DesktopOnly } from 'app-modules/application/components/MediaTargets';
import { Mute, Unmute } from './buttons';
import VolumeBar from './VolumeBar';
import s from './style/Volume';

class Volume extends React.Component {
  static onWrapperClick(e) {
    e.stopPropagation();
  }

  constructor(props) {
    super(props);

    this.state = {
      volumeBarVisible: !props.volumeBarHover,
    };

    this.volumeBar = React.createRef();
  }

  onMouseEnter = () => {
    if (!this.state.volumeBarVisible) {
      this.setState({
        volumeBarVisible: true,
      });
    } else if (this.state.needsToHide) {
      this.setState({
        needsToHide: false,
      });
    }
  };

  onMouseLeave = () => {
    if (this.state.volumeBarVisible) {
      if (this.volumeBar.current && this.volumeBar.current.isChanging()) {
        this.setState({
          needsToHide: true,
        });
      } else {
        this.setState({
          volumeBarVisible: false,
          needsToHide: false,
        });
      }
    }
  };

  onVolumeBarChangeStart = () => {
    if (this.props.onChangeStart) {
      this.props.onChangeStart();
    }
  };

  onVolumeBarChangeEnd = () => {
    if (this.state.needsToHide) {
      this.setState({
        needsToHide: false,
      });
    }

    if (this.props.onChangeEnd) {
      this.props.onChangeEnd();
    }
  };

  toggleMute = (e) => {
    e.preventDefault();

    if (this.props.isMuted) {
      this.props.unMute();
    } else {
      this.props.mute();
    }
  };

  render() {
    const { volume, isMuted, setVolume } = this.props;

    return (
      <s.volume
        onClick={Volume.onWrapperClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {isMuted && <Unmute onClick={this.toggleMute} />}
        {!isMuted && <Mute onClick={this.toggleMute} />}

        <DesktopOnly>
          <s.volumeBarWrapper visible={Boolean(!isMuted && this.state.volumeBarVisible)}>
            <VolumeBar
              ref={this.volumeBar}
              volume={volume}
              onChange={setVolume}
              onChangeStart={this.onVolumeBarChangeStart}
              onChangeEnd={this.onVolumeBarChangeEnd}
            />
          </s.volumeBarWrapper>
        </DesktopOnly>
      </s.volume>
    );
  }
}

Volume.propTypes = {
  isMuted: PropTypes.bool,
  volume: PropTypes.number,
  volumeBarHover: PropTypes.bool,
  mute: PropTypes.func.isRequired,
  unMute: PropTypes.func.isRequired,
  setVolume: PropTypes.func.isRequired,
  onChangeStart: PropTypes.func,
  onChangeEnd: PropTypes.func,
};

Volume.defaultProps = {
  isMuted: true,
  volume: 0,
  volumeBarHover: true,
};

export default Volume;
