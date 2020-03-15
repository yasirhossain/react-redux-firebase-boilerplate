// Vendors
import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiArrowRightIcon from '@material-ui/icons/ArrowRight';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  menuItem: {
    '&:hover': {
      background: '#ffffff',
    },
  },
  menuItemWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
};

class MenuItemComponent extends React.Component {
  isItemFlat = () => !this.props.item.list;

  handleOnClick = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    this.props.onClick(this.props.item);
  }

  handleOnHover = () => {
    this.props.onCCSetIndex(this.props.index);
  }

  render() {
    const {
      item, classes, selected, t,
    } = this.props;
    return (
      <MuiMenuItem
        className={classes.menuItem}
        selected={selected}
        onClick={this.handleOnClick}
        onMouseEnter={this.handleOnHover}
      >
        <div className={classes.menuItemWrapper}>
          {item.name ? item.name : t(item.nameKey)}

          {!this.isItemFlat() && <MuiArrowRightIcon />}
        </div>
      </MuiMenuItem>
    );
  }
}


MenuItemComponent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,

  item: PropTypes.shape({
    name: PropTypes.string,
    nameKey: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({})),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onCCSetIndex: PropTypes.func.isRequired,
};

export const MenuItem = withStyles(styles)(withNamespaces()(MenuItemComponent));
