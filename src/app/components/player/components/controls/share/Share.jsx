import Menu from '@material-ui/core/Menu/Menu';
import PropTypes from 'prop-types';
import React from 'react';
import { FacebookShare } from './Facebook';
import { LinkShare } from './Link';
import { Share as ShareButton } from '../buttons';
import { TwitterShare } from './Twitter';
import { withPlayer } from '../../PlayerContext';

class ShareComponent extends React.Component {
  static propTypes = {
    channel: PropTypes.shape({}),
    isTrivia: PropTypes.bool,
    nowPlaying: PropTypes.shape({}).isRequired,
    player: PropTypes.shape({
      containerRef: PropTypes.object.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    channel: null,
    isTrivia: false,
  }

  state = {
    anchorEl: null,
  }

  close = () => {
    this.setState({ anchorEl: null });
  }

  open = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  }

  render() {
    const { anchorEl } = this.state;
    const {
      channel,
      isTrivia,
      nowPlaying,
      player,
    } = this.props;

    let url;
    if (typeof window !== 'undefined') {
      const { href } = window.location;
      const searchStart = href.indexOf('?');
      url = searchStart > -1 ? href.substring(0, searchStart) : href;
    }

    let text;
    if (isTrivia) {
      text = 'Join fans live for Winner and a Movie. A live interactive trivia show.';
    } else if (channel) {
      text = `Watch ${nowPlaying.title} on ${channel.name} (CH ${channel.number}) with me live!`;
    } else {
      text = `Watch ${nowPlaying.name} on demand for free!`;
    }

    return (
      <React.Fragment>
        <ShareButton
          aria-owns={anchorEl ? 'share-menu' : null}
          aria-haspopup="true"
          onClick={this.open}
        />
        <Menu
          anchorEl={anchorEl}
          id="share-menu"
          onClose={this.close}
          open={Boolean(anchorEl)}
          container={player.containerRef && player.containerRef.current}
        >
          <FacebookShare onClick={this.close} text={text} url={url} />
          <TwitterShare isTrivia={isTrivia} onClick={this.close} text={text} url={url} />
          <LinkShare onClick={this.close} url={url} />
        </Menu>
      </React.Fragment>
    );
  }
}

export const Share = withPlayer(ShareComponent);
