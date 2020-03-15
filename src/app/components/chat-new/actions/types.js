import { ActionTypeCreator } from 'app-webtech-core/es/actions/actionType';

const ActionType = new ActionTypeCreator('CHAT');

export const SETUP = ActionType.simple('SETUP');
export const LOAD_ROOM = ActionType.simple('LOAD_ROOM');
export const CLEAR_ROOM = ActionType.simple('CLEAR_ROOM');
export const MESSAGE_RECEIVED = ActionType.simple('MESSAGE_RECEIVED');
export const MESSAGE_REMOVED = ActionType.simple('MESSAGE_REMOVED');
export const MESSAGE_PINNED = ActionType.simple('MESSAGE_PINNED');
export const SEND_MESSAGE = ActionType.RSAA('SEND_MESSAGE');
export const SELECT_MESSAGE = ActionType.simple('SELECT_MESSAGE');
export const CLEAR_SELECTED_MESSAGE = ActionType.simple('CLEAR_SELECTED_MESSAGE');
export const SHOW = ActionType.simple('SHOW');
export const HIDE = ActionType.simple('HIDE');
export const PIN_MESSAGE = ActionType.simple('PIN_MESSAGE');
export const CLEAR_PINNED_MESSAGE = ActionType.simple('CLEAR_PINNED_MESSAGE');
export const DELETE_MESSAGE = ActionType.simple('DELETE_MESSAGE');
export const ASSOCIATE_CHAT_USER = ActionType.simple('ASSOCIATE_CHAT_USER');
export const DISABLE = ActionType.simple('DISABLE');
export const ENABLE = ActionType.simple('ENABLE');
export const UPDATE_AVATAR = ActionType.simple('UPDATE_AVATAR');
export const UPDATE_CHAT_NAME = ActionType.simple('UPDATE_CHAT_NAME');
export const UPLOAD_AVATAR = ActionType.RSAA('UPLOAD_AVATAR');
export const DELETE_AVATAR = ActionType.simple('DELETE_AVATAR');
UPLOAD_AVATAR.PROGRESS = ActionType.simple('UPLOAD_AVATAR_PROGRESS');
export const USER_BANNED = ActionType.simple('USER_BANNED');
export const VISIBILITY_OVERRIDEN = ActionType.simple('VISIBILITY_OVERRIDEN');
