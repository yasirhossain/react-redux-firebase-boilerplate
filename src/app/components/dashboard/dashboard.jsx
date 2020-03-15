import React, { Component } from 'react';
import { connect } from 'react-redux';

import streamDummyData from '../../utils/streamDummyData.js';

import VideoSelector from '../videoFeed/videoSelector';
import CTASelector from '../cta/ctaSelector';
import ChatControls from '../chat/chatControls';

import { toggleChat } from '../live/liveActions';
import { getLiveState } from '../live/liveReducer';

//import { logout } from '../userActions/userActions';
//import { getUser } from '../userActions/userReducer';

import styles from './dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  onLogin = event => {
    event.preventDefault();
    this.props.dispatch(toggleLogin());
  };

  onSignup = event => {
    event.preventDefault();
    this.props.dispatch(toggleSignup());
  };

  onLogout = event => {
    event.preventDefault();
    this.props.dispatch(logout());
  };

  render() {
    const userLinks = (
      <div className={styles['login-container']}>
        <button onClick={this.onLogout.bind(this)}>Logout</button>
      </div>
    );

    const guestLinks = (
      <div className={styles['login-container']}>
        <button onClick={this.onLogin.bind(this)}>Login</button>
        <button onClick={this.onSignup.bind(this)}>Sign Up</button>
      </div>
    );

    return (
      <div className={styles['dashboard']}>
        <div className={globalStyles['container-w-header']}>
          <div className={styles['dashboard-container']}>
            { this.props.user && this.props.user.isAdmin ? [
                <div key='dashboard'>
                  <div className={styles['card-container']}>
                    <VideoSelector />
                    <CTASelector avatar={streamDummyData.avatars.default} />
                    <ChatControls />
                  </div>
                </div>
              ] : [
                <div key='no-results' className={styles['no-access']}>
                  <div>
                    <h1>You do not have access.</h1>
                  </div>
                </div>
              ]
            }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    showLoginDialog: getLoginViewable(state),
    showSignupDialog: getSignupViewable(state),
    live: getLiveState(state),
    user: getUser(state),
    campaign: streamDummyData.campaigns[0],
  };
}

export default connect(mapStateToProps)(Dashboard);
