import { connect } from 'react-redux';
import { selectors } from 'app-webtech-core';
import { VideoBumperComponent } from '../components/VideoBumper';

const mapStateToProps = state => ({
  playerIsFullscreen: selectors.player.properties(state).isFullscreen,
  nowPlaying: selectors.player.properties(state).nowPlaying,
});

export const VideoBumper = connect(mapStateToProps)(VideoBumperComponent);
