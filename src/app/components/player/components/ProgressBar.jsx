import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  border-radius: 4px;
  display: flex;
  font-size: 1.3rem;
  font-weight: bold;
`;

const From = styled.div`
  color: #66D7CA;
`;

const Total = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: inherit;
  flex: 1 1 auto;
  height: 8px;
  margin: auto 2rem;
`;

const Elapsed = styled.div.attrs({
  style: props => ({
    width: `${props.percentage * 100}%`,
  }),
})`
  background-color: #2A89FB;
  border-radius: inherit;
  height: 100%;
`;

const End = styled.div`
  color: #fff;
  opacity: 0.7;
`;

function minutesLeft(stop) {
  const dStop = new Date(stop);
  return Math.round((dStop.getTime() - Date.now()) / (1000 * 60));
}

function elapsed(start, stop) {
  const now = new Date();
  return (now - start) / (stop - start);
}

function doubleDigits(num) {
  return num > 9 ? num : `0${num}`;
}

function endTime(stop) {
  const hours = stop.getHours() % 12;
  const minutes = doubleDigits(stop.getMinutes());
  const ampm = stop.getHours() < 12 ? 'AM' : 'PM';
  return `${hours}:${minutes}${ampm}`;
}

const ProgressBar = ({ className, hideTimes, nowPlaying }) => (
  nowPlaying && nowPlaying.start && nowPlaying.stop ? (
    <Wrapper className={className}>
      {!hideTimes && (
        <From>{minutesLeft(nowPlaying.stop)} minutes left</From>
      )}
      <Total>
        <Elapsed percentage={elapsed(nowPlaying.start, nowPlaying.stop)} />
      </Total>
      {!hideTimes && (
        <End>{endTime(nowPlaying.stop)}</End>
      )}
    </Wrapper>
  ) : null
);
ProgressBar.propTypes = {
  className: PropTypes.string,
  hideTimes: PropTypes.bool,
  nowPlaying: PropTypes.shape({}).isRequired,
};
ProgressBar.defaultProps = {
  className: null,
  hideTimes: false,
};

export default ProgressBar;
