import React, { Component } from 'react';
import { connect } from 'react-redux';

import streamDummyData from '../../utils/streamDummyData.js';

import VideoSelector from '../videoFeed/videoSelector';
import CTASelector from '../cta/ctaSelector';
import ChatControls from '../chat/chatControls';

import { toggleChat } from '../../actions/live_actions';
import { getLiveState } from '../../reducers/live_reducer';

import { logout } from '../../actions/user_actions';
import { getUser } from '../../reducers/user_reducer';

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
      <div className={'login-container'}>
        <button onClick={this.onLogout.bind(this)}>Logout</button>
      </div>
    );

    const guestLinks = (
      <div className={'login-container'}>
        <button onClick={this.onLogin.bind(this)}>Login</button>
        <button onClick={this.onSignup.bind(this)}>Sign Up</button>
      </div>
    );

    return (
      <div className={'dashboard'}>
        <div className={'container-w-header'}>
          <div className={'dashboard-container'}>
            { this.props.user && this.props.user.isAdmin ? [
                <div key='dashboard'>
                  <div className={'card-container'}>
                    <VideoSelector />
                    <CTASelector avatar={streamDummyData.avatars.default} />
                    <ChatControls />
                  </div>
                </div>
              ] : [
                <div key='no-results' className={'no-access'}>
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
