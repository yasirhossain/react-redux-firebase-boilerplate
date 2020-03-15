import streamDummyData from '../utils/streamDummyData';

// Export Constants
export const GET_CHANNEL = 'GET_CHANNEL';
export const GET_CHANNELS = 'GET_CHANNELS';

// Export Actions
export function fetchChannel(slug) {
  return {
    type: GET_CHANNEL,
    slug,
  };
}

export function fetchChannels() {
  return {
    type: GET_CHANNELS,
  };
}
