// Vendors
import React from 'react';
import PropTypes from 'prop-types';
import camelCase from 'lodash/camelCase';

// Components
import { Menu } from './components/Menu';
import { Settings as SettingsButton } from '../buttons';

export class Settings extends React.Component {
  static propTypes = {
    onCCSettingsChange: PropTypes.func.isRequired,
    resetCCSettings: PropTypes.func.isRequired,
    onCCMenuOpen: PropTypes.func.isRequired,
    onCCMenuClose: PropTypes.func.isRequired,
    onCCSubmenuOpen: PropTypes.func.isRequired,
    onCCSetIndex: PropTypes.func.isRequired,
    isCCMenuOpen: PropTypes.bool.isRequired,
    ccMenuSelectedIndexes: PropTypes.instanceOf(Array).isRequired,
    currentCCMenu: PropTypes.instanceOf(Array).isRequired,
    currentCCMenuName: PropTypes.string.isRequired,
  };

  state = {
    anchorEl: null,
  };

  close = () => {
    this.setState({ anchorEl: null });
    this.props.onCCMenuClose();
  };

  open = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ anchorEl: event.currentTarget });
    // calls to prop function to set the menu to open
    this.props.onCCMenuOpen();
  }

  handleOnSelect = (item) => {
    if (Array.isArray(item.list)) {
      // if this has a submenu then open the next submenu
      this.props.onCCSubmenuOpen();
    } else {
      // if this does not have a submenu then set the caption setting
      this.changeCaptionsSettings(item.value);
    }
  };

  changeCaptionsSettings = (value) => {
    const { currentCCMenuName } = this.props;

    if (value === 'reset') {
      this.props.resetCCSettings();
    } else {
      this.props.onCCSettingsChange(camelCase(currentCCMenuName), value);
    }

    this.close();
  };

  render() {
    const { anchorEl } = this.state;
    const {
      isCCMenuOpen,
      ccMenuSelectedIndexes,
      onCCSetIndex,
      currentCCMenu,
    } = this.props;

    return (
      <React.Fragment>
        <SettingsButton
          aria-owns={anchorEl ? 'share-menu' : null}
          aria-haspopup="true"
          onClick={this.open}
        />

        <Menu
          anchorEl={anchorEl}
          id="share-menu"
          onClose={this.close}
          open={isCCMenuOpen}
          list={currentCCMenu}
          onSelect={this.handleOnSelect}
          ccMenuSelectedIndexes={ccMenuSelectedIndexes}
          onCCSetIndex={onCCSetIndex}
        />
      </React.Fragment>
    );
  }
}
