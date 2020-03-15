/* global FB: false */
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React from 'react';
import { FacebookIcon } from 'app-modules/userAccount/components/SocialAuthentication/FacebookIcon';
import { withStyles } from '@material-ui/core/styles';
import { withPlayer } from '../../PlayerContext';

const facebookAppId = process.env.FACEBOOK_APP_ID;

const styles = {
  icon: {
    fill: '#4267B2',
  },
};

class FacebookShareComponent extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
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

  componentDidMount() {
    this.initFacebook();
  }

  facebookInitPromise = null;

  initFacebook() {
    if (!this.facebookInitPromise) {
      this.facebookInitPromise = new Promise((resolve) => {
        window.fbAsyncInit = this.fbAsyncInit(resolve);

        const id = 'facebook-jssdk';
        const fjs = document.getElementsByTagName('script')[0];
        if (document.getElementById(id)) {
          resolve();
        } else {
          const js = document.createElement('script');
          js.id = id;
          js.src = 'https://connect.facebook.net/en_US/sdk.js';
          fjs.parentNode.insertBefore(js, fjs);
        }
      });
    }

    return this.facebookInitPromise;
  }

  fbAsyncInit = resolve => () => {
    FB.init({
      appId: facebookAppId,
      autoLogAppEvents: false,
      xfbml: false,
      version: 'v3.1',
    });
    resolve();
  }

  handleOnClick = async (e) => {
    const { player } = this.props;

    await this.initFacebook();

    const openShareDialog = () => {
      FB.ui({
        hashtag: '#PlutoTV',
        href: this.props.url || window.location.href,
        method: 'share',
        quote: this.props.text,
      });
    };

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
          <FacebookIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary="Facebook" />
      </MenuItem>
    );
  }
}

export const FacebookShare = withPlayer(withStyles(styles)(FacebookShareComponent));
