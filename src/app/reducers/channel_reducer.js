import streamDummyData from '../utils/streamDummyData';

import {
  GET_CHANNEL, GET_CHANNELS,
} from '../actions/channel_actions';

// Initial State
const initialState = {
  channel: [],
  channels: streamDummyData.channels,
};

const ChannelReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHANNEL:
      return {
        ... state,
        channel: state.channels.filter(channel => channel.slug === action.slug),
      };

    case GET_CHANNELS:
      return {
        ... state,
        channel: state.channels,
      };

    default:
      return state;
  }
};

/* Selectors */
export const getChannels = state => state.channel;
export const getChannel = (state, slug) => state.channel.channels.filter(channel => channel.slug === slug);

// Export Reducer
export default ChannelReducer;
