import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hls from 'hls.js';

import AdStitcher from '../../utils/adStitcher/adStitcher';

const propTypes = {
  src: PropTypes.string,
  type: PropTypes.string,
  video: PropTypes.object,
};

export default class HLSSource extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      src: this.props.src
    }
    this.AdStitcher = new AdStitcher();
    this.hls = new Hls();
  }

  componentDidMount() {
    if (this.props.src) this.loadHls(this.props.src);
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.src !== this.state.src) {
      this.setState({ src: nextProps.src });
      this.loadHls(nextProps.src);
    }
  }

  loadHls(src) {
    const { video } = this.props;
    if (src == undefined) video.load();
    else if (Hls.isSupported()) {
      // HLSjs support
      this.hls.loadSource(src);
      this.hls.attachMedia(video);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (window) {
          console.log(window.navigator.userAgent);
          const ua = window.navigator.userAgent;
          if (ua.includes('11.0 Safari') || ua.includes('Mobile')) {
            video.muted = true;
          }
        }
        video.controls = true;
        video.play();
      });
      this.hls.on(Hls.Events.FRAG_CHANGED, (e, data) => {
        return this.AdStitcher.tagIterator(data.frag.tagList);
      });
    } else {
      // Native HLS support
      video.src = src;
      video.muted = true;
      video.controls = true;
      video.play();
    }
  }

  render() {
    return (
      <source
        src={this.props.src}
        type={this.props.type || 'application/x-mpegURL'}
      />
    );
  }

}

HLSSource.propTypes = propTypes;
