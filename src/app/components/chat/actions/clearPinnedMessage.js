import debug from 'debug';
import { firebase, disconnectDb } from 'app-modules/application/utils/firebase';
import { CLEAR_PINNED_MESSAGE } from './types';
import { roles } from '../constants/roles';
import { chatValidateUserRoleThunkAction } from './validateUserRole';

const logger = debug('web:chat:actions:clearPinnedMessage');

export const chatPinMessageActionThunk = () =>
  async (dispatch, getState) => {
    try {
      const { chat: { isConfigured, roomId, pinnedMessage } } = getState();
      if (!isConfigured) {
        throw new Error('Chat not configured');
      }
      if (!roomId) {
        throw new Error('Not inside a chat room');
      }
      if (!pinnedMessage) {
        throw new Error('There is no message pinned');
      }

      const isAllowed = await dispatch(chatValidateUserRoleThunkAction([roles.ADMIN], false));

      if (isAllowed) {
        const db = firebase.database();
        db.goOnline();
        await db.ref(`/chat-rooms/${roomId}/pinnedMessage`).set(null);
      }

      await dispatch({ type: CLEAR_PINNED_MESSAGE });
    } catch (err) {
      logger('Error', { err });
      await dispatch({
        type: CLEAR_PINNED_MESSAGE,
        payload: err,
        error: true,
      });
    } finally {
      disconnectDb();
    }
  };
