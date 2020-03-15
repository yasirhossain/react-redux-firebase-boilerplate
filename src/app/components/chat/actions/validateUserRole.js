import { firebase, disconnectDb } from 'app-modules/application/utils/firebase';

export const chatValidateUserRoleThunkAction = (allowedRoles = [], throwWhenNotAllowed = true) =>
  async (dispatch, getState) => {
    const {
      chat: {
        isConfigured,
        chatUserId,
      },
    } = getState();
    if (!isConfigured) {
      throw new Error('Chat not configured');
    }

    let isAllowed = false;
    if (chatUserId) {
      const db = firebase.database();
      db.goOnline();

      const userRoleSnapshot = await db.ref(`/users/${chatUserId}/role`).once('value');
      if (userRoleSnapshot.exists()) {
        const userRole = userRoleSnapshot.val();
        isAllowed = allowedRoles.includes(userRole);
      }
      disconnectDb();
    }

    if (!isAllowed && throwWhenNotAllowed) {
      throw new Error(`Chat User ${chatUserId} not allowed to execute`);
    }
    return isAllowed;
  };
