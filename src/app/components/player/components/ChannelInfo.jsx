import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ProgressBar from './ProgressBar';
import durationToHuman, { SMALL_UNITS } from './helpers/durationToHuman';

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

const Panel = styled.div`
  flex: ${props => (props.guideMaximized && !props.playerIsFullscreen ? 2 : 1)} 1 0;
  transition: flex-grow 0.3s linear;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 8%;
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 2;

  @media (max-width: 767px) {
    padding-bottom: 25px;
  }
`;

const EpisodeData = styled.div`
  margin-bottom: .4em;
  position: relative;
  z-index: 2;
`;

const EpisodeSeriesName = EpisodeData.extend`
  font-family: 'Open Sans';
  font-size: 36px;
  line-height: 46px;
  font-weight: 900;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const EpisodeName = EpisodeData.extend`
  font-family: 'Open Sans';
  font-size: 24px;
  line-height: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  svg {
    color: #fff !important;
    position: relative;
    top: 3px;
  }

  &:before { content: open-quote; }
  &:after { content: close-quote; }

  @media (max-width: 767px) {
    display: none;
  }
`;

const EpisodeDescription = EpisodeData.extend`
  font-family: 'Open Sans';
  font-size: 18px;
  line-height: 23px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;

  @media (max-width: 767px) {
    display: none;
  }
`;

const BottomProgressBar = styled(ProgressBar)`
  border-radius: 0;
  height: 3px;
  overflow: hidden;
  position: relative;
  z-index: 2;
  width: 100%;
  > div {
    margin: 0;
  }
`;

const WrapperBg = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 0;
  height: 65%;
  width: 100%;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(24,24,24,0.66) 52.02%, #000 100%);
`;

const MD = styled.span``;
const Metadata = styled.div`
  font-family: 'Open Sans';
  font-size: 18px;
  margin-bottom: 1.4em;
  ${MD} + ${MD} {
    margin-left: 2em;
    position: relative;
  }
  ${MD} + ${MD}:before {
    content: '.';
    position: absolute;
    top: -16px;
    left: -25px;
    font-size: 30px;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;

const getTextSubText = (main, sub, quoteMain = false) => {
  const mainText = quoteMain ? `\`${main}\`` : main;
  return (sub && sub !== main && sub !== 'None' ?
    `${mainText} / ${sub}` : `${mainText}`);
};

const ChannelInfo = ({ nowPlaying, ...props }) => (
  <Wrapper {...props}>
    <Panel {...props}>
      <EpisodeSeriesName>{nowPlaying && nowPlaying.series && nowPlaying.series.name}</EpisodeSeriesName>
      {nowPlaying && nowPlaying.episode && nowPlaying.episode.name && nowPlaying.episode.name !== nowPlaying.series.name &&
        <EpisodeName>{nowPlaying.episode.name}</EpisodeName>
      }
      <EpisodeDescription>
        {nowPlaying && nowPlaying.episode && nowPlaying.episode.description}
      </EpisodeDescription>
      <Metadata>
        {nowPlaying && nowPlaying.episode && nowPlaying.episode.duration && (
          <MD>{durationToHuman(nowPlaying.episode.duration, SMALL_UNITS)}</MD>
        )}
        {nowPlaying && nowPlaying.episode && nowPlaying.episode.genre && (
          <MD>{getTextSubText(nowPlaying.episode.genre, nowPlaying.episode.subGenre)}</MD>
        )}
      </Metadata>
      <BottomProgressBar nowPlaying={nowPlaying} hideTimes />
    </Panel>
    <WrapperBg />
  </Wrapper>
);

ChannelInfo.propTypes = {
  nowPlaying: PropTypes.shape({}).isRequired,
  guideMaximized: PropTypes.bool,
  playerIsFullscreen: PropTypes.bool,
};
ChannelInfo.defaultProps = {
  guideMaximized: false,
  playerIsFullscreen: true,
};

export default ChannelInfo;
