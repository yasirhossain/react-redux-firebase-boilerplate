import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';
import styled from 'styled-components';
import ProgressBar from './ProgressBar';
import durationToHuman from './helpers/durationToHuman';

const BumperWrapper = styled.div`
  bottom: ${props => (props.playerIsFullscreen ? '4rem' : '2rem')};
  box-sizing: border-box;
  color: #fff;
  display: flex;
  opacity: ${props => (props.shows || !props.playerIsFullscreen ? 1 : 0)};
  padding: ${props => (props.playerIsFullscreen ? '0 100px' : '0 100px 75vh')};
  position: absolute;
  transition: none 0.3s linear;
  transition-property: background-color, bottom, opacity, padding;
  width: 100%;
  z-index: 3;
`;

const NumberWrapper = styled.div`
  display: flex;
  flex: 0 1 auto;
`;

const Number = styled.div`
  font-weight: bold;
  margin: auto 1rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  float: left;
  text-align: center;
  width: 25%;
`;

const CopyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  float: left;
  font-family: 'Open Sans', sans-serif;
  font-size: 1.5em;
  width: 75%;
`;

const VerticalAlign = styled.div`
  margin: auto 0;
`;

const Title = styled.div`
  font-size: 1.7em;
  font-weight: 900;
  line-height: 1.1em;
  margin-bottom: .4em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;


const MD = styled.span``;
const Metadata = styled.div`
  font-size: 0.7em;
  font-weight: bold;
  ${MD} + ${MD}:before {
    content: '|';
    font-size: 1.3em;
    font-weight: normal;
    margin: 0 0.7em;
  }
`;

const Description = styled.div`
  font-size: .8em;
  line-height: 1.4em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

class VideoBumperComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.hideBumper = debounce(this.hideBumper.bind(this), 3000);
  }

  componentDidMount() {
    this.hideBumper();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.playerIsFullscreen !== nextProps.playerIsFullscreen) {
      this.setState({ shows: true });
      this.hideBumper();
    }
  }

  hideBumper() {
    this.setState({ shows: false });
  }

  renderChannelLogo() {
    const { nowPlaying: { channel } } = this.props;

    if (channel) {
      const logoPath = channel.logo && channel.logo.path;
      if (logoPath) {
        return (
          <img
            alt={channel.name}
            src={logoPath}
            style={{ width: 150, margin: 'auto 0' }}
          />
        );
      }
      return <span>{channel.name}</span>;
    }

    return null;
  }

  render() {
    const { nowPlaying, ...restProps } = this.props;
    return (
      <BumperWrapper {...restProps} {...this.state}>
        <NumberWrapper>
          <Number>{nowPlaying && nowPlaying.channel && nowPlaying.channel.number}</Number>
        </NumberWrapper>
        <LogoWrapper>
          {this.renderChannelLogo()}
        </LogoWrapper>
        <CopyWrapper>
          <VerticalAlign>
            <Title>{nowPlaying && nowPlaying.episode && nowPlaying.episode.name}</Title>
            <ProgressBar nowPlaying={nowPlaying} />
            {nowPlaying && nowPlaying.episode &&
              <Metadata>
                {nowPlaying.episode.firstAired &&
                  <MD>{nowPlaying.episode.firstAired.getFullYear()}</MD>
                }
                {nowPlaying.episode.genre && nowPlaying.episode.subGenre &&
                  <MD>{nowPlaying.episode.genre} / {nowPlaying.episode.subGenre}</MD>
                }
                {nowPlaying.episode.duration &&
                  <MD>{durationToHuman(nowPlaying.episode.duration)}</MD>
                }
              </Metadata>
            }
            <Description>
              {nowPlaying && nowPlaying.episode && nowPlaying.episode.description}
            </Description>
          </VerticalAlign>
        </CopyWrapper>
      </BumperWrapper>
    );
  }
}

VideoBumperComponent.defaultProps = {
  nowPlaying: {},
};
VideoBumperComponent.propTypes = {
  playerIsFullscreen: PropTypes.bool.isRequired,
  nowPlaying: PropTypes.shape({}),
};

export { VideoBumperComponent };
