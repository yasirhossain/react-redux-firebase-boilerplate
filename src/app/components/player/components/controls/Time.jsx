import React from 'react';
import PropTypes from 'prop-types';
import formatTime from './../../../../utils/formatTime';
import s from './style/Time';

function Time({ startShowTime, endShowTime, duration, position, children, playerIsFullscreen }) {
  return (
    <s.time>
      <s.timeStart playerIsFullscreen={playerIsFullscreen}>
        {startShowTime || formatTime(position)}
      </s.timeStart>
      {children || '-'}
      <s.timeEnd playerIsFullscreen={playerIsFullscreen}>
        {endShowTime || formatTime(duration)}
      </s.timeEnd>
    </s.time>
  );
}

Time.propTypes = {
  duration: PropTypes.number,
  position: PropTypes.number,
  startShowTime: PropTypes.string,
  endShowTime: PropTypes.string,
  playerIsFullscreen: PropTypes.bool.isRequired,
};

Time.defaultProps = {
  duration: 0,
  position: 0,
  startShowTime: '',
  endShowTime: '',
};

export default Time;
