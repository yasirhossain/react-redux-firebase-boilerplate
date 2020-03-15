import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/Button';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share';

import ChatNameDialog from '../../Dialog/pages/ChatNameDialog';

import { Player } from './video-react';
import HLSSource from '../videoPlayer/HLSSource';
import streamDummyData from '../../utils/streamDummyData';
import firebaseTools from '../../utils/firebase-tools';
import { getRandomInt } from '../../utils/helperFunctions';
import cuid from './cuid';

// import Header from '../../../App/components/Header/Header';

import PinnedCTA from '../../Tools/Pinned/PinnedCTA';
import PollView from '../../Tools/Poll/PollView';

import ChatInput from '../../Tools/Chat/ChatInput';
import ChatMessages from '../../Tools/Chat/ChatMessages';

import { toggleSignup } from '../../App/AppActions';
import { getLoginViewable, getSignupViewable } from '../../App/AppReducer';

import { getUser } from '../../User/UserReducer';

import { fetchChannel } from '../channel_actions';
import { getChannel } from '../channel_reducer';

import { showChat, setTempUser } from '../../Live/LiveActions';
import { getLiveState } from '../../Live/LiveReducer';

export class Channel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: '',
      usersOnline: 0,
    };
    this.getVideo = this.getVideo.bind(this);
  }

  componentDidMount() {
    this.getVideo();
    this.loadChatControls();

    let plutoChatUser = localStorage.getItem('plutoChatUser');

    if (plutoChatUser && plutoChatUser !== null) {
      plutoChatUser = JSON.parse(localStorage.getItem('plutoChatUser'));
      this.props.dispatch(setTempUser(plutoChatUser));
    } else {
      const avatar = this.props.live.tempUser.avatar,
            chatName = this.props.live.tempUser.chatName;

      this.props.dispatch(setTempUser({ avatar, chatName }));
    }
  }

  loadChatControls = () => {
    firebaseTools.database.ref('chatControls').on('value', snapshot => {
      if (snapshot.val() !== null) {
        this.props.dispatch(showChat(snapshot.val().options.viewable));
      }
    });
  };

  getVideo = () => {
    const stream = `https://stitcher.pluto.tv/stitch/hls/channel/${this.props.channel[0].id}/master.m3u8?deviceType=web&serverSideAds=true&deviceMake=safari&deviceVersion=1&deviceId=spencer&appVersion=1&deviceDNT=0&deviceModel=web&sid=yasirProd`;
    this.setState({stream: stream});
  };

  render() {
    const channel = this.props.channel[0];

    return (
      <div>
        {
          channel ? (
            <div className={styles['live-page'] + (this.state.stream ? ' ' + styles['live'] : '') + (this.props.live.showChat ? '' : ' ' + styles['hide-chat'])}>
              <div className={styles['dialog-container']}>
                <ChatNameDialog
                  dispatch={this.props.dispatch}
                  avatar={this.props.live.tempUser.avatar}
                  showChatNameDialog={this.props.live.showChatNameDialog} />
              </div>

              <div className={globalStyles['container']}>
                <div className={styles['section-container']}>
                  <PinnedCTA />
                  <div className={styles['video-container']}>
                    <Player
                      playsInline={true}
                    >
                      <HLSSource
                        isVideoChild
                        src={this.state.stream}
                      />
                    </Player>
                  </div>
                </div>
                <ChatMessages
                  dispatch={this.props.dispatch}
                  user={this.props.user}
                  viewable={this.props.live.showChat}
                />
                <ChatInput
                  user={this.props.user}
                  showChatNameDialog={this.props.live.showChatNameDialog}
                  chatName={this.props.live.tempUser.chatName}
                  avatar={this.props.live.tempUser.avatar}
                  replyActive={this.props.live.replyActive}
                  replyMessage={this.props.live.replyMessage}
                  dispatch={this.props.dispatch}
                  defaultAvatar={streamDummyData.avatars.default}
                  charLimit={streamDummyData.charLimit}
                  viewable={this.props.live.showChat}
                />
                <div className={styles['bg-container']}>
                  <div className={styles['bg-overlay']}></div>
                  <div className={styles['bg-banner']} style={{background: `transparent url("${channel.banner}") center no-repeat`, backgroundSize: 'cover'}}></div>
                </div>
              </div>
            </div>
          ) : null
        }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    showLoginDialog: getLoginViewable(state),
    showSignupDialog: getSignupViewable(state),
    live: getLiveState(state),
    user: getUser(state),
    channel: getChannel(state, props.params.slug),
  };
}

Channel.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

Channel.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(Channel);
