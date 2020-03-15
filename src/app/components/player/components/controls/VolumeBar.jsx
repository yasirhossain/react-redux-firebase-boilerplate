import React from 'react';
import PropTypes from 'prop-types';
import s from './style/VolumeBar';

class VolumeBar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isChanging: false,
    };
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('touchmove', this.onTouchMove);
    window.addEventListener('touchend', this.onTouchEnd);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchEnd);
  }

  onClick = (e) => {
    e.stopPropagation();
    const percent = this.getSeekPercent(e.pageX);

    if (this.props.onChange) {
      this.props.onChange(percent);
    }

    this.setState({
      volume: percent,
    });
  };

  onMouseDown = (e) => {
    e.stopPropagation();

    if (this.props.onChangeStart) {
      this.props.onChangeStart();
    }

    this.setState({
      isChanging: true,
    });
  };

  onTouchStart = (e) => {
    e.stopPropagation();

    if (this.props.onChangeStart) {
      this.props.onChangeStart();
    }

    this.setState({
      isChanging: true,
    });
  };

  onMouseUp = (e) => {
    e.stopPropagation();

    if (this.state.isChanging) {
      const percent = this.getSeekPercent(e.pageX);

      if (this.props.onChange) {
        this.props.onChange(percent);
      }

      if (this.props.onChangeEnd) {
        this.props.onChangeEnd();
      }

      this.setState({
        isChanging: false,
      });
    }
  };

  onTouchEnd = (e) => {
    e.stopPropagation();

    if (this.state.isChanging && e.changedTouches.length === 1) {
      const percent = this.getSeekPercent(e.changedTouches[0].pageX);

      if (this.props.onChange) {
        this.props.onChange(percent);
      }

      if (this.props.onChangeEnd) {
        this.props.onChangeEnd();
      }

      this.setState({
        isChanging: false,
      });
    }
  };

  onMouseMove = (e) => {
    e.stopPropagation();

    if (this.state.isChanging) {
      const percent = this.getSeekPercent(e.pageX);

      if (this.props.onChange) {
        this.props.onChange(percent);
      }

      this.setState({
        volume: percent,
      });
    }
  };

  onTouchMove = (e) => {
    e.stopPropagation();

    if (this.state.isChanging && e.changedTouches.length === 1) {
      const percent = this.getSeekPercent(e.changedTouches[0].pageX);

      this.setState({
        volume: percent,
      });
    }
  };

  getSeekPercent = (pageX) => {
    const position = pageX - this.seeker.getBoundingClientRect().left;
    const max = this.seeker.getBoundingClientRect().width;
    return Math.max(0, Math.min((position / max) * 100, 100));
  };

  getSeekerElement = (element) => {
    this.seeker = element;
  };

  isChanging = () => {
    return this.state.isChanging;
  };

  render() {
    const { volume } = this.props;

    return (
      <s.wrapper
        onClick={this.onClick}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onTouchStart}
        role="slider"
        tabIndex={0}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={volume}
      >
        <s.progressWrapper innerRef={this.getSeekerElement}>
          <s.progress style={{ width: `${volume}%` }} />
        </s.progressWrapper>
      </s.wrapper>
    );
  }
}

VolumeBar.propTypes = {
  volume: PropTypes.number,
  onChange: PropTypes.func,
  onChangeStart: PropTypes.func,
  onChangeEnd: PropTypes.func,
};

export default VolumeBar;
