import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React from 'react';
import queryString from 'querystring';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { TwitterIcon } from 'app-modules/userAccount/components/SocialAuthentication/TwitterIcon';
import { withPlayer } from '../../PlayerContext';

const apiTweetUrl = 'https://twitter.com/intent/tweet?';
const width = 600;
const height = 310;

const styles = {
  icon: {
    fill: '#55ACEE',
  },
};

class TwitterShareComponent extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    isTrivia: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    url: PropTypes.string,
    player: PropTypes.shape({
      isFullscreen: PropTypes.bool.isRequired,
      exitFullscreen: PropTypes.func.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    url: null,
  }

  handleOnClick = (e) => {
    const {
      isTrivia,
      text,
      url,
      player,
    } = this.props;

    const windowParams = queryString.stringify({
      width,
      height,
      top: (window.outerHeight - height) / 2,
      left: (window.outerWidth - width) / 2,
    }, ',');

    let hashtags = 'FreeTV,PlutoTV';
    if (isTrivia) {
      hashtags = `${hashtags},interactiveTV,triviaGame`;
    }

    const openShareDialog = () => window.open(apiTweetUrl + queryString.stringify({
      hashtags,
      text,
      url: url || window.location.href,
      via: 'PlutoTV',
    }), 'twitterIntent', windowParams);

    if (player.isFullscreen) {
      player.exitFullscreen();

      setTimeout(openShareDialog, 1000);
    } else {
      openShareDialog();
    }

    this.props.onClick(e);
  }

  render() {
    const { classes } = this.props;
    return (
      <MenuItem onClick={this.handleOnClick}>
        <ListItemIcon>
          <TwitterIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary="Twitter" />
      </MenuItem>
    );
  }
}

export const TwitterShare = withPlayer(withStyles(styles)(TwitterShareComponent));
