import debug from 'debug';
import { firebase, disconnectDb } from 'app-modules/application/utils/firebase';
import { LOAD_ROOM } from './types';
import { chatConfigureMessageUpdaterActionThunk as configureMessageUpdater } from './configureMessageUpdater';
import { chatAssociateChatUserActionThunk as associateChatUser } from './associateChatUser';

const logger = debug('web:chat:actions:loadRoom');

export const chatLoadRoomActionThunk = (chatRoomId, messageCount = 100) =>
  async (dispatch, getState) => {
    try {
      const db = firebase.database();
      db.goOnline();
      logger('Loading chat room data', { chatRoomId });

      const roomRef = db.ref(`/chat-rooms/${chatRoomId}`);
      const roomDataSnapshot = await roomRef.once('value');

      const chatMessagesRef = db.ref(`/chat-messages/${chatRoomId}`);
      const roomMessagesSnapshot = await chatMessagesRef
        .orderByChild('createdAt')
        .endAt(Date.now())
        .limitToLast(messageCount)
        .once('value');

      if (roomDataSnapshot.exists()) {
        const roomData = roomDataSnapshot.val();
        if (!roomData.enabled) {
          throw new Error(`Chat room ${chatRoomId} not enabled`);
        }
      }

      const messages = roomMessagesSnapshot.val() || {};

      // Just creating the chat/trivia users when a chat room is loaded
      const { chat: { isConfigured } } = getState();
      if (!isConfigured) {
        await dispatch(associateChatUser());
      }

      await dispatch(configureMessageUpdater(chatRoomId, messageCount));

      await dispatch({
        type: LOAD_ROOM,
        payload: {
          roomId: chatRoomId,
          messageList: Object.keys(messages),
          messages,
        },
      });
    } catch (err) {
      await dispatch({
        type: LOAD_ROOM,
        payload: err,
        error: true,
      });
    } finally {
      disconnectDb();
    }
  };
