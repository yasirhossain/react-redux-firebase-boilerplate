import debug from 'debug';
import { firebase, disconnectDb } from 'app-modules/application/utils/firebase';
import { PIN_MESSAGE } from './types';
import { roles } from '../constants/roles';
import { chatValidateUserRoleThunkAction } from './validateUserRole';

const logger = debug('web:chat:actions:pinMessage');

export const chatPinMessageActionThunk = messageId =>
  async (dispatch, getState) => {
    try {
      const {
        chat: {
          isConfigured,
          roomId,
          messages,
        },
      } = getState();
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

      await dispatch(chatValidateUserRoleThunkAction([roles.ADMIN, roles.INFLUENCER]));

      const pinnedMessageId = messageId;
      const pinnedMessage = {
        id: pinnedMessageId,
        ...messages[pinnedMessageId],
      };

      await db.ref(`/chat-rooms/${roomId}/pinnedMessage`).set(pinnedMessage);

      await dispatch({ type: PIN_MESSAGE, payload: { pinnedMessage } });
    } catch (err) {
      logger('Error', { err, args: { messageId } });
      await dispatch({
        type: PIN_MESSAGE,
        payload: err,
        error: true,
      });
    } finally {
      disconnectDb();
    }
  };
