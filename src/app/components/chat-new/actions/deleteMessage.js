import debug from 'debug';
import { firebase, disconnectDb } from 'app-modules/application/utils/firebase';
import { DELETE_MESSAGE } from './types';
import { roles } from '../constants/roles';
import { chatValidateUserRoleThunkAction } from './validateUserRole';

const logger = debug('web:chat:actions:deleteMessage');

export const chatDeleteMessageActionThunk = messageId =>
  async (dispatch, getState) => {
    try {
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

      await db.ref(`/chat-messages/${roomId}/${messageId}`).remove();

      await dispatch({ type: DELETE_MESSAGE });
    } catch (err) {
      logger('Error', { err });
      await dispatch({
        type: DELETE_MESSAGE,
        payload: err,
        error: true,
      });
    } finally {
      disconnectDb();
    }
  };
