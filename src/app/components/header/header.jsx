import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Button from '@material-ui/core/Button';
import Menu, { MenuItem } from '@material-ui/core/Menu';

import streamDummyData from '../../utils/streamDummyData';

import SignupDialog from '../../../Dialog/pages/SignupDialog';
import LoginDialog from '../../../Dialog/pages/LoginDialog';

import { toggleLogin, toggleSignup, toggleHeaderMenu } from '../../../App/AppActions';
import { logout } from '../../../User/UserActions';
import { getAppState } from '../../../App/AppReducer';

export function Header(props) {
  const onLogin = () => props.dispatch(toggleLogin());
  const onSignup = () => props.dispatch(toggleSignup());
  const onLogout = () => {
    props.dispatch(logout());
    handleRequestClose();
  };

  const handleClick = event => {
    props.dispatch(toggleHeaderMenu({ headerMenuOpen: true, headerAnchorEl: event.currentTarget }));
  };

  const handleRequestClose = () => {
    props.dispatch(toggleHeaderMenu({ headerMenuOpen: false, headerAnchorEl: props.headerMenu }));
  };

  const renderUserLinks = (
    <div className={styles['login-container']}>
      <Button
        aria-owns={props.app.open ? 'simple-menu' : null}
        aria-haspopup="true"
        onClick={handleClick}
      >
        { props.user.isAuthenticated ? props.user.user[0].chatName : '' }
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={props.app.headerAnchorEl}
        open={props.app.headerMenuOpen}
        onRequestClose={handleRequestClose}
      >
        <MenuItem onClick={onLogout.bind(this)}>Logout</MenuItem>
      </Menu>
    </div>
  );

  const renderGuestLinks = (
    <div className={styles['login-container']}>
      <button onClick={onLogin.bind(this)}>Login</button>
      <button onClick={onSignup.bind(this)}>Sign Up</button>
    </div>
  );

  return (
    <header className={styles.header}>
      <div className={styles['logo-container']}>
        <Link to="/" >
          <div className={styles['logo']} style={{background: `transparent url("${streamDummyData.avatars.default}") center no-repeat`, backgroundSize: 'contain'}}></div>
          <span className={styles['title']}></span>
        </Link>
      </div>
      <div className={styles.content}>
        <div className={styles.logo}></div>
        { props.user.isAuthenticated ? renderUserLinks : renderGuestLinks }
      </div>
      <div className={styles['dialog-container']}>
        <SignupDialog
          dispatch={props.dispatch}
          user={props.user}
          showSignupDialog={props.app.showSignupDialog} />
        <LoginDialog
          dispatch={props.dispatch}
          user={props.user}
          showLoginDialog={props.app.showLoginDialog} />
      </div>
    </header>
  );
}

function mapStateToProps(state) {
  return {
    app: getAppState(state),
  };
}

Header.contextTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object,
};

export default connect(mapStateToProps)(Header);
