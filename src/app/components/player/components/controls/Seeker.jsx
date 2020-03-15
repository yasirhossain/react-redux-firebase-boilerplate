import EventListener from 'react-event-listener';
import React from 'react';
import PropTypes from 'prop-types';
import Time from './Time';
import s from './style/Seeker';

export default class Seeker extends React.Component {
  static propTypes = {
    duration: PropTypes.number,
    onSeek: PropTypes.func,
    passive: PropTypes.bool,
    position: PropTypes.number,
    startShowTime: PropTypes.string,
    endShowTime: PropTypes.string,
    playerIsFullscreen: PropTypes.bool.isRequired,
    isVOD: PropTypes.bool,
  }

  static defaultProps = {
    duration: 0,
    onSeek: null,
    passive: false,
    position: 0,
    startShowTime: '',
    endShowTime: '',
    isVOD: false,
  }

  state = {
    seeking: false,
    seekPosition: null,
  }

  onClick(e) {
    e.stopPropagation();
  }

  onMouseDown = (e) => {
    e.stopPropagation();

    this.setState({
      seeking: true,
    });
  }

  onTouchStart = (e) => {
    e.stopPropagation();

    this.setState({
      seeking: true,
    });
  }

  onMouseUp = (e) => {
    e.stopPropagation();

    if (this.state.seeking) {
      const percent = this.getSeekPercent(e.pageX);

      if (this.props.onSeek) {
        this.props.onSeek(this.props.duration * (percent / 100));
      }

      this.setState({
        seeking: false,
        seekPosition: null,
      });
    }
  }

  onTouchEnd = (e) => {
    e.stopPropagation();

    if (this.state.seeking && e.changedTouches.length === 1) {
      const percent = this.getSeekPercent(e.changedTouches[0].pageX);

      if (this.props.onSeek) {
        this.props.onSeek(this.props.duration * (percent / 100));
      }

      this.setState({
        seeking: false,
        seekPosition: null,
      });
    }
  }

  onMouseMove = (e) => {
    e.stopPropagation();

    if (this.state.seeking) {
      this.setState({
        seekPosition: this.getSeekPercent(e.pageX),
      });
    }
  }

  onTouchMove = (e) => {
    e.stopPropagation();

    if (this.state.seeking && e.changedTouches.length === 1) {
      this.setState({
        seekPosition: this.getSeekPercent(e.changedTouches[0].pageX),
      });
    }
  }

  getSeekPercent(pageX) {
    const position = pageX - this.seeker.getBoundingClientRect().left;
    const max = this.seeker.getBoundingClientRect().width;
    return Math.max(0, Math.min((position / max) * 100, 100));
  }

  getSeekerElement = (element) => {
    this.seeker = element;
  }

  render() {
    const {
      duration,
      position,
      passive,
      startShowTime,
      endShowTime,
      playerIsFullscreen,
      isVOD,
    } = this.props;
    const { seekPosition } = this.state;

    let percent;
    if (seekPosition) {
      percent = seekPosition;
    } else {
      percent = duration > 0 ? Math.min((position / duration) * 100, 100) : 0;
    }

    return (
      <s.wrapper
        onClick={passive ? undefined : this.onClick}
        onMouseDown={passive ? undefined : this.onMouseDown}
        onTouchStart={passive ? undefined : this.onTouchStart}
        playerIsFullscreen={playerIsFullscreen}
        passive={passive}
        role="slider"
        tabIndex={0}
        aria-valuemax={duration}
        aria-valuemin={0}
        aria-valuenow={seekPosition ? duration * (percent / 100) : position}
      >
        <EventListener
          target="window"
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
          onTouchEnd={this.onTouchEnd}
          onTouchMove={this.onTouchMove}
        />
        <Time
          playerIsFullscreen={playerIsFullscreen}
          startShowTime={startShowTime}
          endShowTime={endShowTime}
          duration={duration}
          position={position}
        >
          <s.progressWrapper
            playerIsFullscreen={playerIsFullscreen}
            isVOD={isVOD}
            passive={passive}
            innerRef={this.getSeekerElement}
          >
            <s.progress isVOD={isVOD} style={{ width: `${percent}%` }} />
          </s.progressWrapper>
        </Time>
      </s.wrapper>
    );
  }
}
