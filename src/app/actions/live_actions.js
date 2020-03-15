// Export Constants
export const TOGGLE_LIVE = 'TOGGLE_LIVE';
export const TOGGLE_CHAT_DIALOG = 'TOGGLE_CHAT_DIALOG';
export const SHOW_CHAT = 'SHOW_CHAT';

export const REPLY_ACTIVE = 'REPLY_ACTIVE';
export const REPLY_RESET = 'REPLY_RESET';

export const SET_TEMP_USER = 'SET_TEMP_USER';

// Export Actions
export function toggleLive() {
  return {
    type: IS_LIVE,
  };
}

export function toggleChatDialog() {
  return {
    type: TOGGLE_CHAT_DIALOG,
  };
}

export function showChat(showChat) {
  return {
    type: SHOW_CHAT,
    showChat
  };
}

export function replyActive(message) {
  return {
    type: REPLY_ACTIVE,
    message
  };
}

export function replyReset() {
  return {
    type: REPLY_RESET,
  };
}

export function setTempUser(user) {
  localStorage.setItem('plutoChatUser', JSON.stringify(user));
  return {
    type: SET_TEMP_USER,
    user
  };
}
