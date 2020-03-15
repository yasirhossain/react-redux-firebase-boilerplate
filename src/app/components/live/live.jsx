import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share';
import Countdown from 'react-countdown-now';

import ChatNameDialog from '../dialogs/chat_dialog';

import { Player } from 'video-react';
import HLSSource from '../videoPlayer/HLSSource';
import streamDummyData from '../../utils/streamDummyData';
import firebaseTools from '../../utils/firebase';
import { getRandomInt } from '../../utils/helperFunctions';
import cuid from 'cuid';

// import Header from '../../../App/components/Header/Header';

import PinnedCTA from '../pinned/pinnedCTA';
import PollView from '../poll/pollView';

import ChatInput from '../chat/chatInput';
import ChatMessages from '../chat/chatMessages';

import { toggleSignup } from '../../actions/home_actions';
import { getLoginViewable, getSignupViewable } from '../../reducers/home_reducer';

import { getUser } from '../../reducers/user_reducer';

import { showChat, setTempUser } from '../../actions/live_actions';
import { getLiveState } from '../../reducers/live_reducer';

export class Live extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: '',
      usersOnline: 0,
      countdownViewable: false,
    };
    this.getVideo = this.getVideo.bind(this);
  }

  componentDidMount() {
    this.getVideo();
    this.loadChatControls();
    this.setState({
      countdownViewable: true,
    });

    let plutoChatUser = localStorage.getItem('plutoChatUser');

    if (plutoChatUser && plutoChatUser !== null) {
      plutoChatUser = JSON.parse(localStorage.getItem('plutoChatUser'));
      this.props.dispatch(setTempUser(plutoChatUser));
    } else {
      const avatar = this.props.live.tempUser.avatar,
            chatName = this.props.live.tempUser.chatName;

      this.props.dispatch(setTempUser({ avatar, chatName }));
    }

		//this.refresher = setInterval(this.refreshSession,20000)
  }

  componentWillUnmount() {
		//clearInterval(this.refresher);
	}

  loadChatControls = () => {
    firebaseTools.database.ref('chatControls').on('value', snapshot => {
      if (snapshot.val() !== null) {
        this.props.dispatch(showChat(snapshot.val().options.viewable));
      }
    });
  };

  getVideo = () => {
    firebaseTools.database.ref('video').on('value', snapshot => {
      if (snapshot.val()) {
        this.setState({stream: snapshot.val().video});
      }
      else
        this.setState({stream: streamDummyData.videos[0].src});
    });
  };

  goLive = () => {
    console.log('go live is triggered');
    this.setState({
      countdownViewable: false,
    });
  };

  renderCountdown = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <span>We're live!</span>;
    } else {
      // Render a countdown
      return (
        <div>
          <div>
            <span>{days}</span>
            <span>days</span>
          </div>
          <div>
            <span>{hours}</span>
            <span>hours</span>
          </div>
          <div>
            <span>{minutes}</span>
            <span>minutes</span>
          </div>
          <div>
            <span>{seconds}</span>
            <span>seconds</span>
          </div>
        </div>
      );
    }
  };

  render() {
    const { TwitterShareButton } = ShareButtons,
          campaignStartTime = moment(this.props.campaign.startTime).format('MMMM Do YYYY');

    return (
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
            <div className={styles['copy-container']}>
              <h1 className={styles['title']}>{this.props.campaign.title}</h1>
              <p>{this.props.campaign.description}</p>
              <time>{campaignStartTime}</time>
              <div className={styles['countdown'] + (this.state.countdownViewable ? '' : ' '+ styles['hide'])}>
                <Countdown
                  daysInHours={true}
                  date={this.props.campaign.startTime}
                  renderer={this.renderCountdown}
                  onComplete={this.goLive}
                />
              </div>
              <div className={styles['action-container']}>
                <TwitterShareButton
                  url={`https://whatson.pluto.tv${this.props.location.pathname}`}
                  title={`Chat with us LIVE on ${moment(this.props.campaign.startTime).format('MMMM Do YYYY @ h:mm a')} where we watch ${this.props.campaign.title} on @PlutoTV`}
                  className={`${styles['primary']} ${styles['button']}`}>
                  <FontAwesome name='twitter' /> Share
                </TwitterShareButton>
              </div>
            </div>
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
            <div className={styles['bg-banner']} style={{background: `transparent url("//cf-whatson.pluto.tv/pluto-bg.jpg") center no-repeat`, backgroundSize: 'cover'}}></div>
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

Live.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

Live.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(Live);
