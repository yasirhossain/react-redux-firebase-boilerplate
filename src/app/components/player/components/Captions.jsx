import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { selectors } from 'app-webtech-core';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;

  > div {
    display: inline-block;
  }
  @media (max-width: 767px) {
    > div {
      display: ${props => (props.playerIsFullscreen ? 'inline-block' : 'none')};
    }
  }
`;

class CaptionsComponent extends PureComponent {
  static propTypes = {
    captionsStyle: PropTypes.shape({}).isRequired,
    captionTrack: PropTypes.shape({}),
    playerIsFullscreen: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    captionTrack: null,
  }

  state = {
    currentText: null,
  }

  componentDidMount() {
    this.configureListener();
  }

  componentWillUpdate(nextProps) {
    if (this.props.captionTrack !== nextProps.captionTrack && nextProps.captionTrack === null) {
      this.clearListener();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.captionTrack !== prevProps.captionTrack) {
      this.configureListener();
    }
  }

  componentWillUnmount() {
    this.clearListener();
  }

  onCueChangeHandler = (event) => {
    if (event.target.activeCues.length > 0) {
      this.setState({
        currentText: this.extract(event.target.activeCues),
      });
      this.clearText();
    } else {
      this.clearText(true);
    }
  }

  getStyle = () => {
    const { captionsStyle: customStyle } = this.props;

    const { backgroundColor, backgroundOpacity, ...restCustomStyle } = customStyle;
    const { r, g, b } = this.hexToRgb(backgroundColor);
    const a = (backgroundOpacity / 100);
    const backgroundColorWithOpacity = `rgba(${r}, ${g}, ${b}, ${a})`;

    return {
      backgroundColor: backgroundColorWithOpacity,
      ...restCustomStyle,
    };
  }

  clearTextTimeout;
  clearText = (immediate) => {
    if (this.clearTextTimeout) {
      clearTimeout(this.clearTextTimeout);
    }

    if (immediate) {
      this.setState({ currentText: null });
    } else {
      this.clearTextTimeout = setTimeout(() => {
        this.setState({ currentText: null });
      }, 5000);
    }
  }

  extract = (textTracks) => {
    /* eslint-disable-next-line no-underscore-dangle */
    const __html = [...textTracks].map((textTrack) => {
      const html = textTrack.getCueAsHTML();
      const div = document.createElement('div');
      div.appendChild(html);
      return div.innerHTML;
    }).join('<br />');

    return { __html };
  }

  clearListener = () => {
    const { captionTrack } = this.props;

    if (!captionTrack) {
      return;
    }

    captionTrack.removeEventListener('cuechange', this.onCueChangeHandler);
    this.clearText(true);
  }

  configureListener = () => {
    const { captionTrack } = this.props;

    if (!captionTrack) {
      return;
    }

    captionTrack.mode = 'hidden';
    captionTrack.addEventListener('cuechange', this.onCueChangeHandler);
  }

  hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(hex);
    const dupIfOne = v => (v.length === 1 ? `${v}${v}` : v);
    return result ? {
      r: parseInt(dupIfOne(result[1]), 16),
      g: parseInt(dupIfOne(result[2]), 16),
      b: parseInt(dupIfOne(result[3]), 16),
    } : null;
  }

  render() {
    return (
      <Container className="captions" playerIsFullscreen={this.props.playerIsFullscreen}>
        <div style={this.getStyle()} dangerouslySetInnerHTML={this.state.currentText} />
      </Container>
    );
  }
}

const captionTrackSelector = (state) => {
  const { captionInUseIndex, captionList } = state.playerinternal;

  if (captionInUseIndex === -1 || captionList.length === 0) {
    return null;
  }

  if (!captionList[captionInUseIndex] || !captionList[captionInUseIndex].track) {
    return null;
  }

  return captionList[captionInUseIndex].track;
};

const mapStateToProps = state => ({
  captionsStyle: state.playerinternal.captionsSettings,
  captionTrack: captionTrackSelector(state),
  playerIsFullscreen: selectors.player.properties(state).isFullscreen,
});

export const Captions = connect(mapStateToProps, { pure: true })(CaptionsComponent);
