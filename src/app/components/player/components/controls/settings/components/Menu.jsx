// Vendors
import React from 'react';
import PropTypes from 'prop-types';
import MuiMenu from '@material-ui/core/Menu';
import { checkMobileOperatingSystem } from '../../../../../application/utils/checkMobileOperatingSystem';

// Components
import { MenuItem } from './MenuItem';

/**
 * Wrapper around Material-UI Menu to provide automated way for menu building.
 * See https://material-ui.com/api/menu for API documentation.
 * */

export class Menu extends React.Component {
  static propTypes = {
    list: PropTypes.oneOfType([
      PropTypes.shape({}),
      PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        nameKey: PropTypes.string,
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.bool,
        ]),
      })),
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    onSelect: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    const openChanged = nextProps.open !== this.props.open;
    const itemsChanged = nextProps.list !== this.props.list;
    const indexChanged = nextProps.ccMenuSelectedIndexes !== this.props.ccMenuSelectedIndexes;

    return openChanged || itemsChanged || indexChanged;
  }
  isMobile = checkMobileOperatingSystem();

  render() {
    const {
      list,
      onSelect,
      ccMenuSelectedIndexes,
      onCCSetIndex,
      ...rest
    } = this.props;
    const transformOrigin = { vertical: 'top', horizontal: 'left' };
    /* grabs the last selected index in the array of selected indexes to determine
       which menu item is selected */
    let lastSelectedIndex = 0;
    if (ccMenuSelectedIndexes.length > 0) {
      lastSelectedIndex = ccMenuSelectedIndexes[ccMenuSelectedIndexes.length - 1];
    }

    return (
      <MuiMenu
        transformOrigin={transformOrigin}
        {...rest}
        disablePortal
      >
        {list.map((item, index) => (
          <MenuItem
            key={item.name ? item.name.toLowerCase() : item.nameKey.toLowerCase()}
            item={item}
            index={index}
            onClick={onSelect}
            selected={index === lastSelectedIndex}
            onCCSetIndex={onCCSetIndex}
          />
        ))}
      </MuiMenu>
    );
  }
}

Menu.propTypes = {
  list: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]),
    })),
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  onSelect: PropTypes.func.isRequired,
  onCCSetIndex: PropTypes.func.isRequired,
  ccMenuSelectedIndexes: PropTypes.instanceOf(Array).isRequired,
};
