import React from 'react';
import PropTypes from 'prop-types';
import { Play, Pause } from './buttons';

const PlayToggle = ({ isPlaying, play, pause }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  isPlaying ? <Pause onClick={pause} /> : <Play onClick={play} />
);
PlayToggle.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
};

export default PlayToggle;
