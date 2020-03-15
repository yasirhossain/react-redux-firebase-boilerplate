import LinkIcon from '@material-ui/icons/Link';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';

const styles = {
  hidden: {
    position: 'absolute',
    top: -200,
  },
};

class LinkShareComponent extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  inputRef = React.createRef()

  handleOnClick = () => {
    this.inputRef.current.select();
    document.execCommand('copy');
    this.props.onClick();
  }

  render() {
    const { classes, t, ...props } = this.props;
    return (
      <MenuItem {...props} onClick={this.handleOnClick}>
        <ListItemIcon>
          <LinkIcon />
        </ListItemIcon>
        <ListItemText primary={t('copy_link_address')} />
        <input className={classes.hidden} readOnly ref={this.inputRef} value={this.props.url} />
      </MenuItem>
    );
  }
}

export const LinkShare = withStyles(styles)(
  withNamespaces()(LinkShareComponent)
);
