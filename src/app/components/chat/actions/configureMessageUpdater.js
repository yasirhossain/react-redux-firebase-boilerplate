import debug from 'debug';
import { firebase, disconnectDb } from 'app-modules/application/utils/firebase';
import {
  MESSAGE_RECEIVED,
  MESSAGE_REMOVED,
  MESSAGE_PINNED,
} from './types';

const logger = debug('web:chat:actions:configureMessageUpdater');

// Using this variable to avoid dispatching initial messages
// since loadRoom action also fills the messages data
let messageListInitialized = false;
const chatMessagedReceivedListener = dispatch => (snapshot, previousKey) => {
  if (messageListInitialized) {
    const messageData = snapshot.val();
    logger(`Message RECEIVED: ${snapshot.key}`, { messageData, previousKey });
    dispatch({
      type: MESSAGE_RECEIVED,
      payload: {
        ...messageData,
        id: snapshot.key,
        key: snapshot.key,
        previousKey,
      },
    });

    // Force reset disconnect queue on every message received
    disconnectDb();
  } else {
    logger('Not initialized');
  }
};

const chatMessagedChangedListener = dispatch => (snapshot, previousKey) => {
  const messageData = snapshot.val();
  logger(`Message CHANGED: ${snapshot.key}`, { messageData, previousKey });
  dispatch({
    type: MESSAGE_RECEIVED,
    payload: {
      ...messageData,
      id: snapshot.key,
      key: snapshot.key,
      previousKey,
    },
  });

  // Force reset disconnect queue on every message received
  disconnectDb();
};

const chatMessagedRemovedListener = dispatch => (snapshot) => {
  logger(`Message REMOVED: ${snapshot.key}`);
  dispatch({
    type: MESSAGE_REMOVED,
    payload: {
      id: snapshot.key,
    },
  });
};

const pinnedMessageUpdatedListener = dispatch => (snapshot) => {
  const messageData = snapshot.val();
  if (messageData) {
    logger(`Message PINNED: ${messageData.id}`, messageData);
    dispatch({
      type: MESSAGE_PINNED,
      payload: messageData,
    });
  }
};

const configureChatMessagesListeners = (chatRoomId, messageCount, dispatch, db) => {
  const chatMessagesRef = db.ref(`/chat-messages/${chatRoomId}`)
    .orderByChild('createdAt')
    .limitToLast(messageCount);

  messageListInitialized = false;
  chatMessagesRef.off('child_added');
  chatMessagesRef.off('child_removed');
  chatMessagesRef.off('child_changed');

  chatMessagesRef.on('child_added', chatMessagedReceivedListener(dispatch));
  chatMessagesRef.once('value').then(() => { messageListInitialized = true; });
  chatMessagesRef.on('child_removed', chatMessagedRemovedListener(dispatch));
  chatMessagesRef.on('child_changed', chatMessagedChangedListener(dispatch));
};

const configurePinnedMessagesListener = (chatRoomId, dispatch, db) => {
  const chatRoomPinnedMessageRef = db.ref(`/chat-rooms/${chatRoomId}/pinnedMessage`);

  chatRoomPinnedMessageRef.off('value');
  chatRoomPinnedMessageRef.on('value', pinnedMessageUpdatedListener(dispatch));
};

export const chatConfigureMessageUpdaterActionThunk = (chatRoomId, messageCount = 100) =>
  async (dispatch, getState) => {
    try {
      const { chat: { isConfigured } } = getState();
      if (!isConfigured) {
        throw new Error('Chat not configured');
      }
      const db = firebase.database();
      db.goOnline();

      configureChatMessagesListeners(chatRoomId, messageCount, dispatch, db);
      configurePinnedMessagesListener(chatRoomId, dispatch, db);
    } catch (err) {
      await dispatch({
        type: MESSAGE_RECEIVED,
        payload: err,
        error: true,
      });
    } finally {
      disconnectDb();
    }
  };
