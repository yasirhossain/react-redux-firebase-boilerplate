import debug from 'debug';
import { firebase, disconnectDb } from 'app-modules/application/utils/firebase';
import { CLEAR_ROOM } from './types';

const logger = debug('web:chat:actions:clearLoadRoom');

export const chatClearLoadedRoomActionThunk = () =>
  async (dispatch, getState) => {
    try {
      const { chat: { isConfigured, roomId } } = getState();
      if (!isConfigured) {
        throw new Error('Chat not configured');
      }
      if (roomId) {
        logger('Clearing references to loaded room', { roomId });
        const db = firebase.database();
        db.goOnline();

        db.ref(`/chat-messages/${roomId}`).off();
        db.ref(`/chat-rooms/${roomId}`).off();
        db.ref(`/chat-rooms/${roomId}/pinnedMessage`).off();

        await dispatch({ type: CLEAR_ROOM });
      }
    } catch (err) {
      await dispatch({
        type: CLEAR_ROOM,
        payload: err,
        error: true,
      });
    } finally {
      disconnectDb();
    }
  };
