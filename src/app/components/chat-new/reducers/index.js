import { createReducer } from 'app-webtech-core/es/reducers/createReducer';
import {
  SETUP,
  MESSAGE_RECEIVED,
  MESSAGE_REMOVED,
  MESSAGE_PINNED,
  SEND_MESSAGE,
  LOAD_ROOM,
  CLEAR_ROOM,
  SELECT_MESSAGE,
  CLEAR_SELECTED_MESSAGE,
  HIDE,
  SHOW,
  PIN_MESSAGE,
  CLEAR_PINNED_MESSAGE, UPLOAD_AVATAR,
  ENABLE, DISABLE,
  UPDATE_AVATAR,
  UPDATE_CHAT_NAME,
  USER_BANNED,
  VISIBILITY_OVERRIDEN,
} from '../actions/types';

import {
  chatAvatarUploadProgressReducer,
  chatClearAvatarUploadProgressReducer,
} from './avatarUploadProgress';
import { chatSetupReducer } from './setup';
import { chatMessageReceivedReducer } from './messageReceived';
import { chatMessageRemovedReducer } from './messageRemoved';
import { chatMessagePinnedReducer } from './messagePinned';
import { chatLoadRoomReducer } from './loadRoom';
import { chatClearRoomReducer } from './clearRoom';
import {
  chatSendMessageRequestReducer,
  chatSendMessageSuccessReducer,
  chatSendMessageFailureReducer,
} from './sendMessage';
import {
  chatSelectMessageReducer,
  chatClearSelectedMessageReducer,
} from './messageSelect';
import {
  chatHideReducer,
  chatShowReducer,
  chatVisibilityOverridenReducer,
} from './visibility';
import {
  chatEnableReducer,
  chatDisableReducer,
} from './enableDisable';
import { chatPinMessageReducer } from './pinMessage';
import { chatClearPinnedMessageReducer } from './clearPinnedMessage';
import { chatUpdateAvatarReducer } from './updateAvatar';
import { chatUpdateChatNameReducer } from './updateChatName';
import { chatUserBannedReducer } from './userBanned';

export const defaultState = {
  avatarFilePath: null,
  avatarUploadProgress: -1,
  avatarUrl: null,
  chatUserId: null,
  chatUserType: null,
  chatName: null,
  disableChat: false,
  isBanned: false,
  isConfigured: false,
  isVisible: false,
  messageList: [],
  messages: {},
  pinnedMessage: null,
  role: null,
  roomId: null,
  selectedMessage: null,
  sendingMessageStatus: 'idle',
  isVisibilityOverriden: null,
  error: null,
};

export const chatReducer = createReducer(defaultState, {
  [SETUP]: chatSetupReducer,
  [MESSAGE_RECEIVED]: chatMessageReceivedReducer,
  [MESSAGE_REMOVED]: chatMessageRemovedReducer,
  [MESSAGE_PINNED]: chatMessagePinnedReducer,
  [LOAD_ROOM]: chatLoadRoomReducer,
  [CLEAR_ROOM]: chatClearRoomReducer,
  [SEND_MESSAGE.REQUEST]: chatSendMessageRequestReducer,
  [SEND_MESSAGE.SUCCESS]: chatSendMessageSuccessReducer,
  [SEND_MESSAGE.FAILURE]: chatSendMessageFailureReducer,
  [SELECT_MESSAGE]: chatSelectMessageReducer,
  [CLEAR_SELECTED_MESSAGE]: chatClearSelectedMessageReducer,
  [HIDE]: chatHideReducer,
  [SHOW]: chatShowReducer,
  [PIN_MESSAGE]: chatPinMessageReducer,
  [CLEAR_PINNED_MESSAGE]: chatClearPinnedMessageReducer,
  [UPLOAD_AVATAR.PROGRESS]: chatAvatarUploadProgressReducer,
  [UPLOAD_AVATAR.SUCCESS]: chatClearAvatarUploadProgressReducer,
  [UPLOAD_AVATAR.FAILURE]: chatClearAvatarUploadProgressReducer,
  [ENABLE]: chatEnableReducer,
  [DISABLE]: chatDisableReducer,
  [UPDATE_AVATAR]: chatUpdateAvatarReducer,
  [UPDATE_CHAT_NAME]: chatUpdateChatNameReducer,
  [USER_BANNED]: chatUserBannedReducer,
  [VISIBILITY_OVERRIDEN]: chatVisibilityOverridenReducer,
});
