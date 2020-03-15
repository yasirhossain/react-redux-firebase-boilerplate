import cuid from 'cuid';
import streamDummyData from '../../utils/streamDummyData';
import { getRandomInt } from '../../utils/helperFunctions';

import {
  SHOW_CHAT, TOGGLE_LIVE, TOGGLE_CHAT_DIALOG,
  REPLY_ACTIVE, REPLY_RESET,
  SET_TEMP_USER,
} from './LiveActions';

// Initial State
const initialState = {
  showChat: true,
  isLive: false,
  showChatNameDialog: false,

  replyActive: false,
  replyMessage: {},
  tempUser: {
    avatar: `${streamDummyData.avatars.path}${getRandomInt(1,streamDummyData.avatars.total)}.png`,
    chatName: `Citizen-${cuid.slug()}`,
  },
};

const LiveReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CHAT:
      return {
        ... state,
        showChat: action.showChat,
      };

    case TOGGLE_LIVE:
      return {
        ... state,
        isLive: !state.isLive,
      };

    case TOGGLE_CHAT_DIALOG:
      return {
        ... state,
        showChatNameDialog: !state.showChatNameDialog,
      };

    case REPLY_ACTIVE:
      return {
        ... state,
        replyActive: true,
        replyMessage: action.message
      };

    case REPLY_RESET:
      return {
        ... state,
        replyActive: false,
        replyMessage: {}
      };

    case SET_TEMP_USER:
      return {
        ... state,
        tempUser: action.user,
      };

    default:
      return state;
  }
};

/* Selectors */
export const getLiveState = state => state.live;

// Export Reducer
export default LiveReducer;
