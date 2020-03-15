import { firebase, disconnectDb } from 'app-modules/application/utils/firebase';
import { chatValidateUserRoleThunkAction } from './validateUserRole';
import { roles } from '../constants/roles';

async function banMessenger(db, chatUserType, chatUserId) {
  const userRef = db.ref(`/users/${chatUserId}`);
  const userSnapshot = await userRef.once('value');
  const exists = userSnapshot.exists();
  if (exists) {
    const userBannedRef = db.ref(`/users/${chatUserId}/banned`);
    await userBannedRef.set(true);
  }
  return exists;
}

export const chatFlagUserActionThunk = messageId =>
  async (dispatch, getState) => {
    const { chat: { isConfigured, roomId } } = getState();
    if (!isConfigured) {
      throw new Error('Chat not configured');
    }
    if (!roomId) {
      throw new Error('Not inside a chat room');
    }
    if (!messageId) {
      throw new Error('Must pass messageId');
    }

    const db = firebase.database();
    db.goOnline();

    await dispatch(chatValidateUserRoleThunkAction([roles.ADMIN]));

    const chatUserIdRef = db.ref(`/chat-messages/${roomId}/${messageId}/chatUserId`);
    const chatUserIdSnapshot = await chatUserIdRef.once('value');

    if (!chatUserIdSnapshot.exists()) {
      throw new Error('Invalid roomId/messageId combo.');
    }

    const chatUserId = chatUserIdSnapshot.val();
    if (banMessenger(db, 'users', chatUserId)) {
      const devicesRef = db.ref(`/users/${chatUserId}/devices`);
      const devicesSnapshot = await devicesRef.once('value');
      if (devicesSnapshot.exists()) {
        devicesSnapshot.val().map(deviceId => banMessenger(db, 'devices', deviceId));
      }
    } else {
      banMessenger(db, 'devices', chatUserId);
    }

    disconnectDb();
  };
