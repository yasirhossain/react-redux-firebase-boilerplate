import debug from 'debug';
import { firebase, disconnectDb } from 'app-modules/application/utils/firebase';
import { triviaAuthenticatedUserIdSelector } from 'app-modules/trivia/selectors/authenticatedUserId';
import { nameGenerator } from '../helpers/nameGenerator';
import { randomAvatarGenerator } from '../helpers/avatarGenerator';
import { SETUP } from './types';
import { chatUserBannedAction as userBanned } from './userBanned';
import { roles } from '../constants/roles';
import { userTypes } from '../constants/userTypes';

const logger = debug('web:chat:actions:setup');

const fetchChatUser = async (deviceID, userID) => {
  const chatUser = {
    chatUserId: deviceID,
    avatarUrl: randomAvatarGenerator(),
    chatName: nameGenerator(),
    role: roles.NORMAL,
    disableChat: false,
    online: true,
  };
  const db = firebase.database();

  logger('Retrieving user device data', { deviceID });
  if (deviceID) {
    const deviceRef = db.ref(`/devices/${deviceID}`);
    const deviceSnapshot = await deviceRef.once('value');

    if (deviceSnapshot.exists()) {
      const device = deviceSnapshot.val();
      if (device.avatarUrl) {
        logger('Updating user data with device data');
        chatUser.avatarUrl = device.avatarUrl;
        chatUser.chatName = device.chatName;
        chatUser.chatUserId = deviceID;
        chatUser.chatUserType = userTypes.DEVICE;
        chatUser.disableChat = Boolean(device.disableChat);
      }
    }
    const {
      avatarUrl,
      chatName,
      online,
      disableChat,
    } = chatUser;

    await db.ref().update({
      [`/devices/${deviceID}/avatarUrl`]: avatarUrl,
      [`/devices/${deviceID}/chatName`]: chatName,
      [`/devices/${deviceID}/online`]: online,
      [`/devices/${deviceID}/disableChat`]: disableChat,
    });
  }

  logger('Retrieving user data', { userID });
  if (userID) {
    const userRef = db.ref(`/users/${userID}`);
    const userSnapshot = await userRef.once('value');

    if (userSnapshot.exists()) {
      const {
        avatarUrl,
        avatarFilePath,
        chatName,
        role,
        devices = [],
        disableChat,
      } = userSnapshot.val();
      logger('Checking user devices', { devices, currentDevice: deviceID });
      const isOnDeviceList = devices.includes(deviceID);
      logger(`isOnDeviceList: ${isOnDeviceList}`);
      if (isOnDeviceList) {
        chatUser.avatarUrl = avatarUrl;
        chatUser.avatarFilePath = avatarFilePath;
        chatUser.chatName = chatName;
        chatUser.chatUserId = userID;
        chatUser.chatUserType = userTypes.USER;
        chatUser.disableChat = Boolean(disableChat);
        if (Object.keys(roles).includes(role)) {
          chatUser.role = role;
        }
        logger('Updating user data');
      }
    }
  }

  logger('Final user', { chatUser });

  return chatUser;
};

export const chatSetupActionThunk = () =>
  async (dispatch, getState) => {
    try {
      const state = getState();
      const {
        device: {
          ID: deviceID,
        } = {},
      } = state;

      const userID = triviaAuthenticatedUserIdSelector(state);

      const db = firebase.database();
      db.goOnline();

      const chatUser = await fetchChatUser(deviceID, userID);

      db.ref(`/devices/${deviceID}/banned`).on('value', (snapshot) => {
        dispatch(userBanned(snapshot.exists() ? snapshot.val() : false));
      });

      await dispatch({ type: SETUP, payload: chatUser });
    } catch (err) {
      await dispatch({ type: SETUP, payload: err, error: true });
    } finally {
      disconnectDb();
    }
  };
