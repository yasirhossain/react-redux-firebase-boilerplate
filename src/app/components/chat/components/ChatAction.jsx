import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    padding: 5,
  },
  icon: {
    fontSize: 18,
    cursor: 'pointer',
    color: '#AAAAAA',
    '&:hover': {
      color: '#0364E7',
    },
  },
};

class ChatActionComponent extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    icon: PropTypes.func,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    icon: () => { },
    onClick: () => { },
  }

  onClick = (e) => {
    e.stopPropagation();
    this.props.onClick();
  }

  render() {
    const {
      classes, icon: Icon, title, ...props
    } = this.props;

    const btn = (
      <IconButton className={classes.root} {...props} onClick={this.onClick}>
        <Icon className={classes.icon} />
      </IconButton>
    );

    if (title) {
      return <Tooltip title={title}>{btn}</Tooltip>;
    }

    return btn;
  }
}

export const ChatAction = withStyles(styles)(ChatActionComponent);
